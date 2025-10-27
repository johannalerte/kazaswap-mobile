import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Tab {
  id: string;
  label: string;
  path: string;
  showBadge?: boolean;
  badge?: number;
}

interface SlideTabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (tabId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs,
  activeId,
  onChange,
  size = 'md',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 };
      case 'lg':
        return { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 };
      case 'md':
      default:
        return { paddingVertical: 10, paddingHorizontal: 18, fontSize: 14 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[
      styles.container,
      isDark ? styles.darkContainer : styles.lightContainer
    ]}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                paddingVertical: sizeStyles.paddingVertical,
                paddingHorizontal: sizeStyles.paddingHorizontal,
              },
              isActive && (isDark ? styles.activeTabDark : styles.activeTabLight)
            ]}
            onPress={() => onChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                { fontSize: sizeStyles.fontSize },
                isActive
                  ? isDark ? styles.activeTextDark : styles.activeTextLight
                  : isDark ? styles.inactiveTextDark : styles.inactiveTextLight
              ]}
            >
              {tab.label}
            </Text>

            {/* Badge */}
            {tab.showBadge && tab.badge && tab.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {tab.badge > 99 ? '99+' : tab.badge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
  },
  darkContainer: {
    backgroundColor: '#232527',
  },
  lightContainer: {
    backgroundColor: '#F3F4F6',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 2,
    position: 'relative',
  },
  activeTabDark: {
    backgroundColor: '#FFFFFF',
  },
  activeTabLight: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontWeight: '600',
  },
  activeTextDark: {
    color: '#000000',
  },
  activeTextLight: {
    color: '#000000',
  },
  inactiveTextDark: {
    color: '#9CA3AF',
  },
  inactiveTextLight: {
    color: '#6B7280',
  },
  badge: {
    backgroundColor: '#FF784E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

export default SlideTabs;
