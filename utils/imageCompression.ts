/**
 * Comprehensive image compression utility for the webapp
 * Compresses images to optimal web sizes while maintaining quality
 */

// Image compression function
export const compressImage = async (
  file: File, 
  maxWidth: number = 1920, 
  quality: number = 0.85
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Use better image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            
            console.log('Original size:', (file.size / 1024).toFixed(2), 'KB');
            console.log('Compressed size:', (compressedFile.size / 1024).toFixed(2), 'KB');
            console.log('Compression ratio:', ((1 - compressedFile.size / file.size) * 100).toFixed(1) + '%');
            
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Could not load image'));
    };
    
    reader.onerror = () => reject(new Error('Could not read file'));
  });
};

// Specific compression settings for different use cases
export const compressionPresets = {
  // For property images - high quality, web optimized
  property: {
    maxWidth: 1920,
    quality: 0.85
  },
  // For thumbnails - smaller, faster loading
  thumbnail: {
    maxWidth: 400,
    quality: 0.8
  },
  // For profile/avatar images
  avatar: {
    maxWidth: 500,
    quality: 0.85
  },
  // For destination images
  destination: {
    maxWidth: 1920,
    quality: 0.85
  }
};

// Helper function to get file size in human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate image file before processing
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }
  
  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image too large. Maximum size is 50MB' };
  }
  
  // Check supported formats
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!supportedTypes.includes(file.type)) {
    return { valid: false, error: 'Unsupported image format. Use JPG, PNG, or WebP' };
  }
  
  return { valid: true };
};