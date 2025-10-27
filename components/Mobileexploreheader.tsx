import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { usePropertyFilters } from '../hooks/usePropertyFilters';

interface MobileExploreHeaderProps {
  onMapToggle: () => void;
  showMap: boolean;
  onDateRangeChange?: (start: Date | undefined, end: Date | undefined) => void;
  onLocationChange?: (location: { 
    address: string; 
    city?: string; 
    country?: string; 
    latitude?: number; 
    longitude?: number; 
  } | null) => void;
  onPropertyTypeChange?: (propertyType: string | null) => void;
  onBedroomsChange?: (bedrooms: number | null) => void;
  onHostGenderChange?: (hostGender: boolean) => void;
  onPetFriendlyChange?: (petFriendly: boolean) => void;
}

const MobileExploreHeader: React.FC<MobileExploreHeaderProps> = ({
  onMapToggle,
  showMap,
  onDateRangeChange,
  onLocationChange,
  onPropertyTypeChange,
  onBedroomsChange,
  onHostGenderChange,
  onPetFriendlyChange,
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { credits } = useUserData();
  const { propertyTypes, loading } = usePropertyFilters();
  
  const [locationInput, setLocationInput] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedPropertyType, setSelectedPropertyType] = useState('any');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState(0);
  
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [propertyTypeModalOpen, setPropertyTypeModalOpen] = useState(false);

  const handlePropertyTypeChange = (value: string) => {
    setSelectedPropertyType(value);
    if (onPropertyTypeChange) {
      onPropertyTypeChange(value === 'any' ? null : value);
    }
    setPropertyTypeModalOpen(false);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const next = prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      setActiveFilters(next.length);
      return next;
    });
  };

  const applyFilters = () => {
    if (onBedroomsChange) {
      if (selectedFilters.includes('1-bedroom')) {
        onBedroomsChange(1);
      } else if (selectedFilters.includes('2-bedroom')) {
        onBedroomsChange(2);
      } else if (selectedFilters.includes('3-bedroom')) {
        onBedroomsChange(3);
      } else if (selectedFilters.includes('4-bedroom')) {
        onBedroomsChange(-1);
      } else {
        onBedroomsChange(null);
      }
    }
    
    if (onHostGenderChange) {
      onHostGenderChange(selectedFilters.includes('swap-women'));
    }
    
    if (onPetFriendlyChange) {
      onPetFriendlyChange(selectedFilters.includes('pet-friendly'));
    }
    
    setFilterModalOpen(false);
  };

  const applyDates = () => {
    if (onDateRangeChange) {
      onDateRangeChange(startDate, endDate);
    }
    setCalendarModalOpen(false);
  };

  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    if (onDateRangeChange) {
      onDateRangeChange(undefined, undefined);
    }
    setCalendarModalOpen(false);
  };

  return (
    <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Where would you like to go?"
            value={locationInput}
            onChangeText={setLocationInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Credits Button */}
        <TouchableOpacity
          style={styles.creditsButton}
          onPress={() => navigation.navigate(user ? 'Credits' : 'CreditsExplained' as never)}
        >
          <Image
            source={{ uri: '/lovable-uploads/29f151ac-5bc6-43f7-81de-c10a24278aa6.png' }}
            style={styles.creditsIconSmall}
          />
          <Text style={styles.creditsText}>
            {user ? (credits || 0) : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <View style={styles.leftFilters}>
          {/* Filter Button */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalOpen(true)}
          >
            <Image
              source={{ uri: '/lovable-uploads/61fd2019-7363-4b00-b92b-fc750e7df2c9.png' }}
              style={styles.filterIcon}
            />
            {activeFilters > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeFilters}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Property Type Button */}
          <TouchableOpacity
            style={styles.propertyTypeButton}
            onPress={() => setPropertyTypeModalOpen(true)}
          >
            <Image
              source={{ uri: '/lovable-uploads/fe498f9b-2691-408a-9719-5555caa48cb6.png' }}
              style={styles.propertyIcon}
            />
            <Text style={styles.propertyTypeText}>
              {selectedPropertyType === 'any' ? 'Any' : selectedPropertyType}
            </Text>
            {selectedPropertyType !== 'any' && (
              <TouchableOpacity
                onPress={() => handlePropertyTypeChange('any')}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.rightButtons}>
          {/* Map Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMapToggle}
          >
            <Image
              source={require('../assets/maps-2.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Calendar Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setCalendarModalOpen(true)}
          >
            <Image
              source={{ uri: '/lovable-uploads/d7f3fac4-5594-4fd2-bb0f-62427ebb2fe9.png' }}
              style={styles.icon}
            />
            {(startDate || endDate) && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFilterModalOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            <ScrollView style={styles.filterList}>
              {['swap-women', 'pet-friendly', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom'].map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(filter) && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter(filter)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters.includes(filter) && styles.filterOptionTextActive
                  ]}>
                    {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Property Type Modal */}
      <Modal
        visible={propertyTypeModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setPropertyTypeModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setPropertyTypeModalOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Property Type</Text>
            <ScrollView style={styles.filterList}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedPropertyType === 'any' && styles.filterOptionActive
                ]}
                onPress={() => handlePropertyTypeChange('any')}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedPropertyType === 'any' && styles.filterOptionTextActive
                ]}>
                  Any
                </Text>
              </TouchableOpacity>
              {propertyTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    selectedPropertyType === type && styles.filterOptionActive
                  ]}
                  onPress={() => handlePropertyTypeChange(type)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedPropertyType === type && styles.filterOptionTextActive
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Calendar Modal - You'll need to implement a proper date picker */}
      <Modal
        visible={calendarModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCalendarModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCalendarModalOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Dates</Text>
            <Text style={styles.calendarPlaceholder}>
              Calendar component here (use react-native-calendars)
            </Text>
            <View style={styles.dateButtons}>
              <TouchableOpacity style={styles.clearDatesButton} onPress={clearDates}>
                <Text style={styles.clearDatesButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyDates}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F7F6E9',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    height: 64,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  creditsButton: {
    backgroundColor: '#FFE361',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  creditsIconSmall: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  leftFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterIcon: {
    width: 25,
    height: 25,
    tintColor: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF784E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  propertyTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 16,
    gap: 8,
    minWidth: 180,
  },
  propertyIcon: {
    width: 25,
    height: 25,
  },
  propertyTypeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    width: 25,
    height: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterList: {
    maxHeight: 400,
  },
  filterOption: {
    padding: 16,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  filterOptionActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#FFFFFF',
  },
  applyButton: {
    backgroundColor: '#FFE361',
    padding: 16,
    borderRadius: 28,
    marginTop: 12,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  calendarPlaceholder: {
    textAlign: 'center',
    padding: 40,
    color: '#6B7280',
  },
  dateButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  clearDatesButton: {
    flex: 1,
    padding: 16,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clearDatesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
});

export default MobileExploreHeader;
