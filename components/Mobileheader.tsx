import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBackButton = true,
  onBackClick,
}) => {
  const navigation = useNavigation();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackClick}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    backgroundColor: '#F7F6E9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#000000',
  },
  title: {
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 17,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default MobileHeader;
