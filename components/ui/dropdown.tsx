import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { dropdownStyles } from './dropdown.styles'

interface DropdownProps {
  placeholder: string
  value: string
  options: string[]
  onSelect: (value: string) => void
  error?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ placeholder, value, options, onSelect, error }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <TouchableOpacity
        style={[dropdownStyles.input, error && dropdownStyles.inputError]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[dropdownStyles.inputText, !value && dropdownStyles.placeholderText]}>{value || placeholder}</Text>
        <Ionicons name='chevron-down' size={20} color={Colors.dataGray} />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType='fade' onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity style={dropdownStyles.overlay} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <View style={dropdownStyles.modalContent}>
            <View style={dropdownStyles.modalHeader}>
              <Text style={dropdownStyles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Ionicons name='close' size={24} color={Colors.scienceBlue} />
              </TouchableOpacity>
            </View>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[dropdownStyles.option, option === value && dropdownStyles.selectedOption]}
                onPress={() => {
                  onSelect(option)
                  setIsOpen(false)
                }}
              >
                <Text style={[dropdownStyles.optionText, option === value && dropdownStyles.selectedOptionText]}>
                  {option}
                </Text>
                {option === value && <Ionicons name='checkmark' size={20} color={Colors.scienceBlue} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
