import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface SmartAvatarProps {
  src?: string | ImageSourcePropType | null;
  alt?: string;
  fallback?: string;
  size?: number;
}

const SmartAvatar: React.FC<SmartAvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = 'U',
  size = 48,
}) => {
  const [imageError, setImageError] = useState(false);

  const shouldShowImage = src && !imageError;

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (shouldShowImage) {
    const imageSource = typeof src === 'string' ? { uri: src } : src;

    return (
      <View style={[styles.container, containerStyle]}>
        <Image
          source={imageSource as ImageSourcePropType}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Show fallback
  return (
    <View style={[styles.fallbackContainer, containerStyle, styles.fallbackBackground]}>
      <Text style={[styles.fallbackText, { fontSize: size * 0.4 }]}>
        {fallback.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackBackground: {
    backgroundColor: '#6B7280',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SmartAvatar;
