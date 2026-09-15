import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';

const DEFAULT_AVATAR = 'https://via.placeholder.com/150';

const continueWatching = [
  {
    id: '1',
    title: "Izzie's Way Home",
    image: 'https://via.placeholder.com/200x120',
    progress: 0.4,
  },
  {
    id: '2',
    title: 'Finding Dory',
    image: 'https://via.placeholder.com/200x120',
    progress: 0.2,
  },
  {
    id: '3',
    title: 'Wolfwalkers',
    image: 'https://via.placeholder.com/200x120',
    progress: 0.6,
  },
];

export default function MeScreen() {
  const [name, setName] = useState('zeedott');
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Please allow access to your photos to change profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.screen}>
        {/* Gradient background - Watch History tak */}
        <LinearGradient
          colors={['#3b2f63', '#1a1a2e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.topGradient}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <Ionicons name="mail-outline" size={22} color="#fff" />
            <View style={styles.renewalBadge}>
              <MaterialIcons name="diamond" size={14} color="#e8b98a" />
              <ThemedText style={styles.renewalText}>RENEWAL</ThemedText>
            </View>
          </View>

          {/* Profile row */}
          <View style={styles.profileRow}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              <Image
                source={{ uri: avatarUri || DEFAULT_AVATAR }}
                style={styles.avatar}
              />
              <View style={styles.editIconWrapper}>
                <ThemedText style={styles.editIconText}>✎</ThemedText>
              </View>
            </TouchableOpacity>

            <View style={styles.nameWrapper}>
              {isEditingName ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.nameInput}
                  autoFocus
                  onBlur={() => setIsEditingName(false)}
                  onSubmitEditing={() => setIsEditingName(false)}
                  placeholder="Enter your name"
                  placeholderTextColor="#888"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditingName(true)}
                  style={styles.nameTouchRow}
                >
                  <ThemedText style={styles.nameText}>{name}</ThemedText>
                  <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Watch History */}
          <ThemedText style={styles.sectionLabel}>Watch History</ThemedText>

          <View style={styles.card}>
            <TouchableOpacity style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <ThemedText style={styles.cardHeaderText}>
                  Continue Watching
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.historyScrollContent}
            >
              {continueWatching.map((item) => (
                <View key={item.id} style={styles.historyBox}>
                  <View style={styles.thumbWrapper}>
                    <Image source={{ uri: item.image }} style={styles.thumbImage} />
                    <View style={styles.progressBarBg}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${item.progress * 100}%` },
                        ]}
                      />
                    </View>
                  </View>
                  <ThemedText style={styles.historyBoxText} numberOfLines={1}>
                    {item.title}
                  </ThemedText>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Content */}
          <ThemedText style={styles.sectionLabel}>Content</ThemedText>
          <View style={styles.card}>
            <TouchableOpacity style={styles.listRow}>
              <Ionicons name="bookmark-outline" size={20} color="#fff" />
              <ThemedText style={styles.listRowText}>My list</ThemedText>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.listRow}>
              <Ionicons name="download-outline" size={20} color="#fff" />
              <ThemedText style={styles.listRowText}>Download</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Preferences */}
          <ThemedText style={styles.sectionLabel}>Preferences</ThemedText>
          <View style={styles.card}>
            <TouchableOpacity style={styles.listRow}>
              <Ionicons name="settings-outline" size={20} color="#fff" />
              <ThemedText style={styles.listRowText}>Settings</ThemedText>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.listRow}>
              <Ionicons name="help-circle-outline" size={20} color="#fff" />
              <ThemedText style={styles.listRowText}>Help</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Sign Out */}
          <TouchableOpacity style={styles.signOutButton}>
            <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 420,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 16,
  },
  renewalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  renewalText: {
    color: '#e8b98a',
    fontSize: 12,
    fontWeight: '700',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#333',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#fff',
    fontSize: 10,
  },
  nameWrapper: {
    flex: 1,
  },
  nameTouchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingVertical: 2,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 26,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1c1c20',
    borderRadius: 14,
    paddingVertical: 6,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyScrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 10,
  },
  historyBox: {
    width: 50,
    marginRight: 10,
  },
  thumbWrapper: {
    width: 50,
    height: 70,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  progressBarBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBarFill: {
    height: 3,
    backgroundColor: '#3b82f6',
  },
  historyBoxText: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 4,
    textAlign: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  listRowText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2e',
    marginHorizontal: 14,
  },
  signOutButton: {
    backgroundColor: '#1e3a8a',
    marginTop: 26,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 120,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});