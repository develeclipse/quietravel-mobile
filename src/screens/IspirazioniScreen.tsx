import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSizes, shadows } from '../constants/theme';
import { getDestinations, searchDestinations, Destination } from '../api/quietravel';

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'sud-italia',
    name: 'Sud Italia segreto',
    subtitle: '10 perle nascoste',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
  },
  {
    id: 'mare-fuori-stagione',
    name: 'Mare fuori stagione',
    subtitle: 'Spiagge deserte',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 'sapori-autentici',
    name: 'Sapori autentici d\'Italia',
    subtitle: 'Sagre e mercati',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  },
  {
    id: 'capolavori-rinascimento',
    name: 'Capolavori del Rinascimento',
    subtitle: 'Città d\'arte',
    image: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80',
  },
];

const CATEGORIES = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'arte-storia', label: 'Arte & Storia' },
  { id: 'natura', label: 'Natura' },
  { id: 'food', label: 'Food' },
  { id: 'mare', label: 'Mare' },
];

export default function IspirazioniScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'collezioni' | 'storie' | 'destinazioni'>('collezioni');
  const [selectedCategory, setSelectedCategory] = useState('tutti');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    const data = await getDestinations();
    setDestinations(data.slice(0, 50));
    setLoading(false);
  };

  const renderCollection = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() => {}}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.collectionImage} />
      <View style={styles.collectionOverlay}>
        <Text style={styles.collectionName}>{item.name}</Text>
        <Text style={styles.collectionSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDestination = ({ item, index }: { item: Destination; index: number }) => (
    <TouchableOpacity
      style={styles.destinationCard}
      onPress={() => navigation.navigate('DestinationDetail' as never, { slug: item.slug } as never)}
    >
      <View style={styles.destinationImagePlaceholder}>
        <View style={[styles.quietScoreBadge, { position: 'absolute', top: 8, right: 8 }]}>
          <Text style={styles.quietScoreText}>Q{item.quietScore}</Text>
        </View>
      </View>
      <View style={styles.destinationInfo}>
        <View style={styles.destinationHeader}>
          <Text style={styles.destinationName}>{item.name}</Text>
          {index < 2 && (
            <View style={styles.trendingBadge}>
              <Ionicons name="trending-up" size={10} color={colors.accent} />
              <Text style={styles.trendingText}>In tendenza</Text>
            </View>
          )}
        </View>
        <Text style={styles.destinationRegion}>{item.region}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Destinazioni Quiet</Text>
        <Text style={styles.headerSubtitle}>{destinations.length} destinazioni</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={18} color={colors.text.secondary} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Cerca collezioni, regioni, città..."
          />
        </View>
      </View>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
        <Ionicons name="options" size={16} color={colors.primary} />
        <Text style={styles.filterButtonText}>Filtri</Text>
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>1</Text>
        </View>
      </TouchableOpacity>

      {/* Top Tabs */}
      <View style={styles.tabsContainer}>
        {[
          { id: 'collezioni', label: 'Collezioni', icon: 'sparkles' },
          { id: 'storie', label: 'Storie', icon: 'book' },
          { id: 'destinazioni', label: 'Destinazioni', icon: 'location' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.id ? colors.primary : colors.text.secondary}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryPill, selectedCategory === cat.id && styles.categoryPillActive]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat.id && styles.categoryTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <FlatList
        data={activeTab === 'collezioni' ? COLLECTIONS : destinations}
        renderItem={activeTab === 'collezioni' ? renderCollection : (p) => renderDestination({ ...p, index: p.index })}
        keyExtractor={(item) => item.id}
        numColumns={activeTab === 'collezioni' ? 1 : 2}
        columnWrapperStyle={activeTab === 'collezioni' ? undefined : styles.destinationsGrid}
        style={styles.contentList}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchTextInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: spacing.xs,
  },
  filterBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginRight: spacing.xl,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabLabel: {
    fontSize: fontSizes.lg,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  tabLabelActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  categoriesScroll: {
    marginBottom: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.lg,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
  categoryTextActive: {
    color: colors.white,
  },
  contentList: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  collectionCard: {
    height: 180,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))',
  },
  collectionName: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.white,
  },
  collectionSubtitle: {
    fontSize: fontSizes.md,
    color: 'rgba(255,255,255,0.9)',
  },
  destinationsGrid: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  destinationCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  destinationImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#E8E4EE',
  },
  destinationInfo: {
    padding: spacing.sm,
  },
  destinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  destinationName: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.accent}20`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendingText: {
    fontSize: fontSizes.xs,
    color: colors.accent,
    marginLeft: 2,
  },
  destinationRegion: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  quietScoreBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: `${colors.secondary}20`,
  },
  quietScoreText: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.secondary,
  },
});
