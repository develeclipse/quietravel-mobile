import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSizes, shadows } from '../constants/theme';
import { getDestinations, searchDestinations, Destination } from '../api/quietravel';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [trending, setTrending] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    const data = await getDestinations();
    setDestinations(data);
    setFilteredDestinations(data.slice(0, 20));
    setTrending(data.slice(0, 3));
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredDestinations(destinations.slice(0, 20));
    } else {
      const filtered = destinations
        .filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => b.quietScore - a.quietScore)
        .slice(0, 20);
      setFilteredDestinations(filtered);
    }
  };

  const renderActionCard = (
    icon: string,
    iconColor: string,
    title: string,
    subtitle: string,
    screen: string
  ) => (
    <TouchableOpacity
      key={title}
      style={styles.actionCard}
      onPress={() => navigation.navigate(screen as never)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { shadowColor: iconColor }]}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
      </View>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.destinationItem}
      onPress={() => {
        setShowSearch(false);
        navigation.navigate('DestinationDetail' as never, { slug: item.slug } as never);
      }}
    >
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationRegion}>{item.region}</Text>
      </View>
      <View style={[styles.quietScoreBadge, { backgroundColor: `${colors.secondary}20` }]}>
        <Text style={styles.quietScoreText}>Q{item.quietScore}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <View style={styles.badgeIcon}>
            <Ionicons name="sparkles" size={10} color={colors.accent} />
          </View>
          <Text style={styles.badgeText}>ANTI-OVERTOURISM</Text>
        </View>

        <Text style={styles.title}>Dove vuoi andare?</Text>
        <Text style={styles.subtitle}>Inizia la tua esperienza quiet</Text>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={() => setShowSearch(true)} activeOpacity={0.7}>
        <Ionicons name="search" size={20} color={colors.text.secondary} />
        <Text style={styles.searchPlaceholder}>Cerca città o luoghi...</Text>
      </TouchableOpacity>

      {/* Action Cards */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardContainer}>
          {renderActionCard(
            'sparkles',
            colors.primary,
            'Ispirati',
            'Collezioni, storie e destinazioni',
            'Ispirazioni'
          )}
          {renderActionCard(
            'calendar',
            colors.secondary,
            'Pianifica',
            'Itinerari e pacchetti tematici',
            'Pianifica'
          )}
          {renderActionCard(
            'location',
            colors.accent,
            'Vicino a me',
            'Posti segreti e alternative quiet',
            'Vicino'
          )}
        </View>
      </ScrollView>

      {/* Search Modal */}
      <Modal visible={showSearch} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cerca destinazione</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowSearch(false)}
              >
                <Ionicons name="close" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.modalSearchContainer}>
              <View style={styles.modalSearchInput}>
                <Ionicons name="search" size={18} color={colors.text.secondary} />
                <TextInput
                  style={styles.modalSearchTextInput}
                  placeholder="Cerca città o luoghi..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus
                />
              </View>
            </View>

            {/* Results */}
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
              <FlatList
                data={filteredDestinations}
                renderItem={renderDestinationItem}
                keyExtractor={item => item.id}
                style={styles.resultsList}
                contentContainerStyle={styles.resultsContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  searchQuery ? null : (
                    <View style={styles.trendingSection}>
                      <View style={styles.trendingHeader}>
                        <Ionicons name="trending-up" size={16} color={colors.accent} />
                        <Text style={styles.trendingTitle}>In tendenza</Text>
                      </View>
                      {trending.map((item, index) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.trendingItem}
                          onPress={() => {
                            setShowSearch(false);
                            navigation.navigate('DestinationDetail' as never, { slug: item.slug } as never);
                          }}
                        >
                          <View style={styles.destinationInfo}>
                            <Text style={styles.destinationName}>{item.name}</Text>
                            <Text style={styles.destinationRegion}>{item.region}</Text>
                          </View>
                          <View style={[styles.quietScoreBadge, { backgroundColor: `${colors.secondary}20` }]}>
                            <Text style={styles.quietScoreText}>Q{item.quietScore}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                      <Text style={styles.sectionTitle}>Tutte le destinazioni</Text>
                    </View>
                  )
                }
              />
            )}
          </View>
        </View>
      </Modal>
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
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  badgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    fontWeight: '600',
    letterSpacing: 1,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    marginLeft: spacing.sm,
    fontSize: fontSizes.lg,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  cardContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    ...shadows.icon,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSearchContainer: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
  },
  modalSearchTextInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  resultsList: {
    flex: 1,
  },
  resultsContent: {
    padding: spacing.md,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingSection: {
    marginBottom: spacing.md,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  trendingTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  destinationRegion: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  quietScoreBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  quietScoreText: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.secondary,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});
