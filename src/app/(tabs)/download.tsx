import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface DownloadItem {
  id: string;
  title: string;
  image: string;
  size: string;
  watchedPercent: number;
  isNew?: boolean;
}

const downloads: DownloadItem[] = [
  {
    id: '1',
    title: 'Mirzapur: The Movie[ENG SUB]',
    image: 'https://via.placeholder.com/150x90',
    size: '528.26MB',
    watchedPercent: 58,
    isNew: true,
  },
  {
    id: '2',
    title: 'Awarapan 2',
    image: 'https://via.placeholder.com/150x90',
    size: '465.80MB',
    watchedPercent: 42,
  },
  {
    id: '3',
    title: 'Dhamaal 4',
    image: 'https://via.placeholder.com/150x90',
    size: '618.34MB',
    watchedPercent: 74,
  },
];

const TOTAL_STORAGE_GB = 105.34;
const REMAINING_STORAGE_GB = 54.17;
const usedPercent =
  ((TOTAL_STORAGE_GB - REMAINING_STORAGE_GB) / TOTAL_STORAGE_GB) * 100;

export default function DownloadScreen() {
  const [isEditing, setIsEditing] = useState(false);

  const renderItem = ({ item }: { item: DownloadItem }) => (
    <TouchableOpacity style={styles.row}>
      <View style={styles.thumbWrapper}>
        <Image source={{ uri: item.image }} style={styles.thumb} />
        {item.isNew && <View style={styles.newDot} />}
      </View>

      <View style={styles.info}>
        <ThemedText style={styles.title} numberOfLines={1}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.size}>{item.size}</ThemedText>
        <ThemedText style={styles.watched}>
          Watched {item.watchedPercent}%
        </ThemedText>
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.deleteCircle}>
          <ThemedText style={styles.deleteText}>−</ThemedText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
       <LinearGradient
                colors={['#3b2f63', '#1a1a2e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.topGradient}
              />
              
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <ThemedText style={styles.headerTitle}>Download</ThemedText>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <ThemedText style={styles.editButton}>
            {isEditing ? 'Done' : 'Edit'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Storage bar */}
      <View style={styles.storageLabelsRow}>
        <View style={styles.storageLabelItem}>
          <View style={[styles.legendDot, { backgroundColor: '#7c3aed' }]} />
          <ThemedText style={styles.storageLabelText}>
            Internal storage {TOTAL_STORAGE_GB}GB
          </ThemedText>
        </View>
        <View style={styles.storageLabelItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
          <ThemedText style={styles.storageLabelText}>
            {REMAINING_STORAGE_GB}GB remaining
          </ThemedText>
        </View>
      </View>

      {/* Background download */}
      <View style={styles.bgDownloadRow}>
        <ThemedText style={styles.bgDownloadText}>
          Uninterrupted Background Download{' '}
        </ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.setNowText}>Set Now</ThemedText>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={downloads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  editButton: {
    fontSize: 16,
    color: '#ffffff',
    width: 40,
    textAlign: 'right',
  },
  storageRow: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  storageBarBg: {
    height: 20,
    backgroundColor: '#f2f2f2',
  },
  storageBarFill: {
    height: 20,
    flexDirection: 'row',
  },
  storageLabelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  storageLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  storageLabelText: {
    fontSize: 13,
    color: '#555',
  },
  bgDownloadRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexWrap: 'wrap',
  },
  bgDownloadText: {
    fontSize: 13,
    color: '#999',
  },
  setNowText: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  thumbWrapper: {
    position: 'relative',
  },
  thumb: {
    width: 110,
    height: 65,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  newDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ec4899',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  size: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  watched: {
    fontSize: 13,
    color: '#e0a020',
    fontWeight: '600',
    marginTop: 2,
  },
  deleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
});