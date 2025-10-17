# Implementacja Synchronizacji Offline

## Opis problemu

Aplikacja nie synchronizowała wyników zapisanych lokalnie (offline) po przywróceniu połączenia internetowego.

## Rozwiązanie

### 1. Ulepszona detekcja zmiany statusu połączenia (`use-data-sync.ts`)

- **Poprzednio**: Używano `hasInitialSyncRun.current` - synchronizacja uruchamiała się tylko raz po starcie
- **Obecnie**: Używamy `previousOnlineStatus.current` - śledzimy przejście z offline → online
- **Efekt**: Każde przywrócenie połączenia triggeruje synchronizację

### 2. Synchronizacja przed nowym submitem

```typescript
const submitData = async (data: QuizSubmissionData) => {
  if (isOnline) {
    // NAJPIERW synchronizuj pending submissions
    await syncPendingSubmissions()

    // POTEM wyślij nowe dane
    const success = await submitQuizResults(data)
  }
}
```

### 3. Globalna inicjalizacja w `_layout.tsx`

- Hook `useDataSync` jest wywoływany na poziomie root layout
- Przy starcie aplikacji automatycznie sprawdza pending submissions
- Monitoruje zmiany połączenia globalnie dla całej aplikacji

### 4. Usunięcie niepotrzebnej deduplikacji

- Poprzednio: Sprawdzano czy istnieje pending submission z tym samym emailem
- Problem: Użytkownik mógł wypełnić quiz wielokrotnie
- Obecnie: Każdy quiz jest zapisywany jako osobny pending submission

### 5. Timeout dla requestów (15s)

- Dodano AbortController z timeout 15 sekund
- Zapobiega blokowaniu przez długie requesty
- Request jest anulowany jeśli serwer nie odpowie w czasie

## Przepływ danych

### Scenariusz 1: Jest połączenie

1. User wypełnia quiz → `submitData()`
2. Najpierw: `syncPendingSubmissions()` - wyślij wszystkie zapisane lokalnie
3. Następnie: `submitQuizResults()` - wyślij nowe dane
4. Status: ✅ Wysłane na serwer

### Scenariusz 2: Brak połączenia

1. User wypełnia quiz → `submitData()`
2. Sprawdzenie: `isOnline === false`
3. Akcja: `savePendingSubmission()` - zapisz lokalnie
4. Status: 💾 Zapisane lokalnie, czeka na wysłanie

### Scenariusz 3: Przywrócenie połączenia

1. NetInfo wykrywa zmianę: offline → online
2. Trigger: `syncPendingSubmissions()` automatycznie
3. Wysyłanie wszystkich pending submissions po kolei
4. Usuwanie z lokalnej pamięci po sukcesie

### Scenariusz 4: Nowy quiz po przywróceniu połączenia

1. User wypełnia quiz → `submitData()`
2. Sprawdzenie: `isOnline === true`
3. **NAJPIERW**: `syncPendingSubmissions()` - wyślij stare dane
4. **NASTĘPNIE**: `submitQuizResults()` - wyślij nowe dane
5. Status: ✅ Wszystkie dane wysłane

## Mechanizmy zabezpieczające

### 1. Prevent concurrent submissions

```typescript
if (submissionInProgress.current) {
  return false
}
submissionInProgress.current = true
```

### 2. Max retries (3)

- Każdy pending submission ma licznik `retries`
- Po 3 nieudanych próbach - submission jest pomijany
- Zapobiega nieskończonym próbom wysłania błędnych danych

### 3. Sync lock

```typescript
if (isSyncing) {
  return // Skip if already syncing
}
```

### 4. Request timeout

- 15 sekund na każdy request
- Automatyczne anulowanie przy timeout

## Logowanie (console.log)

Wszystkie kluczowe punkty są logowane:

- ✅ "Quiz results submitted successfully"
- 💾 "Saved pending submission: [id]"
- 🔄 "Syncing X pending submissions..."
- ✅ "Successfully synced submission [id]"
- ⚠️ "Failed to sync submission [id], retry #X"
- 🌐 "Device came back online, triggering sync..."
- 📱 "App started with internet connection, checking for pending submissions..."

## Testowanie

### Test 1: Offline → Online

1. Wyłącz WiFi/dane mobilne
2. Wypełnij quiz
3. Włącz WiFi/dane
4. **Oczekiwany efekt**: Automatyczna synchronizacja w tle

### Test 2: Multiple offline submissions

1. Wyłącz WiFi
2. Wypełnij 3 quizy
3. Włącz WiFi
4. **Oczekiwany efekt**: Wszystkie 3 quizy wysłane po kolei

### Test 3: Offline → Online → New quiz

1. Wyłącz WiFi
2. Wypełnij quiz #1
3. Włącz WiFi
4. Natychmiast wypełnij quiz #2
5. **Oczekiwany efekt**:
   - Quiz #1 synchronizowany automatycznie
   - Przed wysłaniem quiz #2, sprawdzane są pending (quiz #1)
   - Oba quizy na serwerze

## Pliki zmodyfikowane

- ✅ `hooks/use-data-sync.ts` - główna logika synchronizacji
- ✅ `app/_layout.tsx` - globalna inicjalizacja
- ✅ `services/offline-storage.ts` - usunięto deduplikację
- ✅ `services/api.ts` - dodano timeout

## Wnioski

Implementacja zapewnia:

- ✅ Automatyczną synchronizację po przywróceniu połączenia
- ✅ Synchronizację przed każdym nowym submitem
- ✅ Globalny monitoring połączenia
- ✅ Zabezpieczenia przed duplikatami i nieskończonymi retry
- ✅ Timeout dla długich requestów
