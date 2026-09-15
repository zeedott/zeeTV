import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

interface ShowItem {
  id: string;
  title: string;
  image: string;
  badge: string;
}

const topTabs = ['ALL', 'TV Series', 'Shorts', 'Movie', 'Anime'];
const regions = ['All regions', 'America', 'Korea', 'U.K', 'Japan'];
const categories = ['All Categories', 'Romance', 'Action', 'Fantasy'];
const sortOptions = ['Popularity', 'Recent', 'High Rating'];

const shows: ShowItem[] = [
  {
    id: '1',
    title: 'A Bona Fide Killer',
    image: 'https://via.placeholder.com/220x300',
    badge: '14 Episode(s)',
  },
  {
    id: '2',
    title: 'Flex x Cop Season 2',
    image: 'https://via.placeholder.com/220x300',
    badge: 'Updated to 12',
  },
  {
    id: '3',
    title: 'Running Man',
    image: 'https://via.placeholder.com/220x300',
    badge: 'Updated to 821',
  },
  {
    id: '4',
    title: 'My Bias, My Boss',
    image: 'https://via.placeholder.com/220x300',
    badge: '12 Episode(s)',
  },
  {
    id: '5',
    title: 'Four Hands, Two Sonatas',
    image: 'https://via.placeholder.com/220x300',
    badge: 'Updated to 6',
  },
  {
    id: '6',
    title: 'Lanterns',
    image: 'https://via.placeholder.com/220x300',
    badge: 'Updated to 5',
  },
];

function FilterRow({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}
    >
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.filterChip, isActive && styles.filterChipActive]}
          >
            <ThemedText
              style={[
                styles.filterChipText,
                isActive && styles.filterChipTextActive,
              ]}
            >
              {option}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeRegion, setActiveRegion] = useState('All regions');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeSort, setActiveSort] = useState('Popularity');

  const renderItem = ({ item }: { item: ShowItem }) => (
    <TouchableOpacity style={[styles.card, { width: CARD_WIDTH }]}>
      <View style={styles.posterWrapper}>
        <Image
          source={{ uri: item.image }}
          style={[styles.poster, { width: CARD_WIDTH, height: CARD_WIDTH * 1.4 }]}
        />
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText} numberOfLines={1}>
            {item.badge}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topTabsRow}
      >
        {topTabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.topTabItem}
            >
              <ThemedText
                style={[
                  styles.topTabText,
                  isActive && styles.topTabTextActive,
                ]}
              >
                {tab}
              </ThemedText>
              {isActive && <View style={styles.topTabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Filters */}
      <FilterRow
        options={regions}
        selected={activeRegion}
        onSelect={setActiveRegion}
      />
      <FilterRow
        options={categories}
        selected={activeCategory}
        onSelect={setActiveCategory}
      />
      <FilterRow
        options={sortOptions}
        selected={activeSort}
        onSelect={setActiveSort}
      />

      {/* Grid */}
      <FlatList
        data={shows}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={{ gap: CARD_MARGIN }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topTabsRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
    gap: 20,
  },
  topTabItem: {
    alignItems: 'center',
  },
  topTabText: {
    fontSize: 17,
    color: '#999',
    fontWeight: '500',
  },
  topTabTextActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
  topTabUnderline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#2563eb',
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterChipActive: {
    backgroundColor: '#eee',
  },
  filterChipText: {
    fontSize: 14,
    color: '#999',
  },
  filterChipTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  gridContent: {
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 16,
  },
  card: {
    marginBottom: 4,
  },
  posterWrapper: {
    position: 'relative',
  },
  poster: {
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  badge: {
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
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginTop: 6,
  },
});