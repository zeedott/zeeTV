import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const topNavTabs = ['Home', 'Shorts', 'K-Drama', 'Anime'];

const banners = [
  {
    id: '1',
    title: 'HOPE',
    image: 'https://via.placeholder.com/720x500',
  },
  {
    id: '2',
    title: 'The Traitors',
    image: 'https://via.placeholder.com/720x500',
  },
];

const quickFilters = [
  { id: 'all', label: 'ALL', icon: '🗓️' },
  { id: 'shorts', label: 'Shorts', icon: '📱' },
  { id: 'upcoming', label: 'Upcoming', icon: '🔔' },
  { id: 'updating', label: 'Updating', icon: '🔥' },
];

const regionTabs = ['Global', 'K-Drama', 'Movie', 'Western', 'India'];

interface RankedItem {
  id: string;
  rank: number;
  title: string;
  image: string;
  badge?: string;
  views: string;
}

const topPicks: RankedItem[] = [
  {
    id: '1',
    rank: 1,
    title: 'When the Mist Clears',
    image: 'https://via.placeholder.com/220x300',
    views: '11542',
  },
  {
    id: '2',
    rank: 2,
    title: 'The Early Spring',
    image: 'https://via.placeholder.com/220x300',
    badge: '24 Episode(s)',
    views: '6895',
  },
  {
    id: '3',
    rank: 3,
    title: 'Daha 17[ENG SUB]',
    image: 'https://via.placeholder.com/220x300',
    badge: 'Updated to 16',
    views: '6872',
  },
  {
    id: '4',
    rank: 4,
    title: 'Second Chance',
    image: 'https://via.placeholder.com/220x300',
    views: '6120',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeRegion, setActiveRegion] = useState('Global');
  const [activeFilter, setActiveFilter] = useState('all');

  const renderRankedItem = ({ item }: { item: RankedItem }) => (
    <TouchableOpacity style={styles.rankedCard}>
      <View style={styles.rankBadge}>
        <ThemedText style={styles.rankBadgeText}>{item.rank}</ThemedText>
      </View>
      <View style={styles.posterWrapper}>
        <Image source={{ uri: item.image }} style={styles.poster} />
        {item.badge && (
          <View style={styles.episodeBadge}>
            <ThemedText style={styles.episodeBadgeText} numberOfLines={1}>
              {item.badge}
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText style={styles.rankedTitle} numberOfLines={1}>
        {item.title}
      </ThemedText>
      <View style={styles.viewsRow}>
        <ThemedText style={styles.fireEmoji}>🔥</ThemedText>
        <ThemedText style={styles.viewsText}>{item.views}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top nav */}
        <View style={styles.topNavRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topNavTabs}
          >
            {topNavTabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={styles.topNavItem}
                >
                  <ThemedText
                    style={[
                      styles.topNavText,
                      isActive && styles.topNavTextActive,
                    ]}
                  >
                    {tab}
                  </ThemedText>
                  {isActive && <View style={styles.topNavUnderline} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#666" />
            <TextInput
              placeholder="The Traitors India Season 2"
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Hero banner */}
        <View style={styles.bannerWrapper}>
          <FlatList
            data={banners}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
                <View style={styles.bannerOverlay}>
                  <ThemedText style={styles.bannerTitle}>{item.title}</ThemedText>
                </View>
              </View>
            )}
          />
          <View style={styles.dotsRow}>
            {banners.map((b, i) => (
              <View
                key={b.id}
                style={[styles.dot, i === 1 && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Quick filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {quickFilters.map((f) => {
            const isActive = f.id === activeFilter;
            return (
              <TouchableOpacity
                key={f.id}
                onPress={() => setActiveFilter(f.id)}
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <ThemedText style={styles.pillIcon}>{f.icon}</ThemedText>
                <ThemedText style={styles.pillText}>{f.label}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Top Picks header */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.sectionDot} />
            <ThemedText style={styles.sectionTitle}>Top Picks</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </View>

        {/* Region tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionRow}
        >
          {regionTabs.map((region) => {
            const isActive = region === activeRegion;
            return (
              <TouchableOpacity
                key={region}
                onPress={() => setActiveRegion(region)}
              >
                <ThemedText
                  style={[
                    styles.regionText,
                    isActive && styles.regionTextActive,
                  ]}
                >
                  {region}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Ranked list */}
        <FlatList
          data={topPicks}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderRankedItem}
          contentContainerStyle={styles.rankedListContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  topNavTabs: {
    gap: 20,
    alignItems: 'center',
  },
  topNavItem: {
    alignItems: 'center',
  },
  topNavText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999',
  },
  topNavTextActive: {
    color: '#000',
    fontWeight: '800',
  },
  topNavUnderline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#2563eb',
  },
  heartButton: {
    backgroundColor: '#fce7d6',
    padding: 8,
    borderRadius: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  menuButton: {
    padding: 4,
  },
  bannerWrapper: {
    marginTop: 14,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#333',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 14,
    backgroundColor: '#fff',
  },
  pillsRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
  },
  pillActive: {
    backgroundColor: '#e0e7ff',
  },
  pillIcon: {
    fontSize: 14,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 6,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  regionRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  regionText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '500',
  },
  regionTextActive: {
    color: '#2563eb',
    fontWeight: '800',
  },
  rankedListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 14,
  },
  rankedCard: {
    width: 130,
    marginRight: 14,
  },
  rankBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 2,
    backgroundColor: '#f5a623',
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  posterWrapper: {
    position: 'relative',
  },
  poster: {
    width: 130,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  episodeBadge: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    backgroundColor: '#e0245e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    maxWidth: '90%',
  },
  episodeBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  rankedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },
  viewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  fireEmoji: {
    fontSize: 12,
  },
  viewsText: {
    fontSize: 13,
    color: '#e0245e',
    fontWeight: '700',
  },
});