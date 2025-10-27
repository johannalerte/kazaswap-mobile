import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { useUnreadMessages } from '../hooks/useUnreadMessages';
import { useTranslation } from '../contexts/TranslationContext';

// Import custom components
import SmartAvatar from './ui/SmartAvatar';
import NotificationBell from './notifications/NotificationBell';
import AuthModal from './ui/AuthModal';
import SlideTabs from './SlideTabs';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, signOut } = useAuth();
  const { isAdmin, credits, avatarUrl } = useUserData();
  const { hasUnread: hasUnreadMessages, unreadCount: chatUnreadCount } = useUnreadMessages();
  const { t } = useTranslation();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const activeTab = 
    route.name === 'Favorites' ? 'favourites' : 
    route.name === 'Chat' ? 'chat' : 
    'explore';

  useEffect(() => {
    console.log('🏠🏠🏠 HEADER MOUNTED 🏠🏠🏠');
    return () => console.log('💥💥💥 HEADER UNMOUNTED 💥💥💥');
  }, []);

  const navTabs = [
    { id: 'explore', label: t('explore'), path: 'Home' },
    { id: 'favourites', label: t('favourites'), path: 'Favorites' },
    { 
      id: 'chat', 
      label: t('chat'), 
      path: 'Chat', 
      showBadge: hasUnreadMessages, 
      badge: chatUnreadCount 
    }
  ];

  const handleTabChange = (tabId: string) => {
    const tab = navTabs.find(t => t.id === tabId);
    if (!tab) return;

    if (!user && (tabId === 'favourites' || tabId === 'chat')) {
      setShowAuthModal(true);
      return;
    }

    navigation.navigate(tab.path as never);
  };

  const handleMenuItemClick = (screenName: string) => {
    setShowUserMenu(false);
    navigation.navigate(screenName as never);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error('Logout error:', error);
      navigation.navigate('Home' as never);
    }
  };

  const renderUserMenu = () => (
    <Modal
      visible={showUserMenu}
      transparent
      animationType="fade"
      onRequestClose={() => setShowUserMenu(false)}
    >
      <Pressable 
        style={styles.modalOverlay}
        onPress={() => setShowUserMenu(false)}
      >
        <View style={styles.menuContainer}>
          <ScrollView>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemClick('Profile')}
            >
              <Image source={require('../assets/user-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>{t('myProfile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemClick('MyPlace')}
            >
              <Image source={require('../assets/home-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>{t('myPlace')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuItemClick('SwapHistory')}
            >
              <Text style={[styles.menuText, { marginLeft: 36 }]}>{t('swapHistory')}</Text>
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemClick('Admin')}
              >
                <Text style={[styles.menuText, styles.adminText, { marginLeft: 36 }]}>
                  {t('adminDashboard')}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.menuSeparator} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Image source={require('../assets/logout-icon.png')} style={styles.menuIcon} />
              <Text style={[styles.menuText, styles.logoutText]}>{t('logout')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.tabsContainer}>
            <SlideTabs
              tabs={navTabs}
              activeId={activeTab}
              onChange={handleTabChange}
              size="md"
              variant="dark"
            />
          </View>

          <View style={styles.rightActions}>
            {user ? (
              <>
                <NotificationBell />
                <TouchableOpacity
                  style={styles.avatarButton}
                  onPress={() => setShowUserMenu(true)}
                >
                  <SmartAvatar
                    src={avatarUrl}
                    alt="Profile"
                    fallback="U"
                    size={48}
                  />
                </TouchableOpacity>
                {!route.name?.includes('Admin') && (
                  <TouchableOpacity
                    style={styles.creditsButton}
                    onPress={() => navigation.navigate('Credits' as never)}
                  >
                    <Image source={require('../assets/credits-icon.png')} style={styles.creditsIcon} />
                    <Text style={styles.creditsText}>{credits || 0}</Text>
                  </TouchableOpacity>
                )}
                {renderUserMenu()}
              </>
            ) : (
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate(user ? 'MyPlace' : 'CreateAccount' as never)}
              >
                <Text style={styles.registerButtonText}>
                  {t('registerYourPlace')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 111,
    height: 44,
  },
  tabsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  creditsButton: {
    backgroundColor: '#FFE361',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creditsIcon: {
    width: 16,
    height: 16,
  },
  creditsText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#FFE361',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 256,
    maxHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  menuText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  adminText: {
    color: '#3B82F6',
  },
  logoutText: {
    color: '#DC2626',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
});

export default Header;
