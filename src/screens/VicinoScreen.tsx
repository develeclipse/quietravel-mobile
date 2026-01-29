import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { colors, spacing, borderRadius, fontSizes, shadows } from '../constants/theme';
import { getDestinations, Destination } from '../api/quietravel';

interface POI {
  id: string;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  quietScore: number;
  region: string;
}

export default function VicinoScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    loadDestinations();
    getLocation();
  }, []);

  const loadDestinations = async () => {
    const data = await getDestinations();
    setDestinations(data.filter(d => d.id).slice(0, 50));
    setLoading(false);
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Default to center of Italy
      setUserLocation({ lat: 41.9028, lng: 12.4964 });
      setLocationName('Roma (default)');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    setLocationName('La tua posizione');
  };

  // Sort by approximate distance (just for demo - real app would use proper distance calculation)
  const sortedDestinations = [...destinations].sort(() => Math.random() - 0.5).slice(0, 20);

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.secondary;
    if (score >= 70) return colors.accent;
    return colors.primary;
  };

  const renderPOI = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.poiCard}
      onPress={() => navigation.navigate('DestinationDetail' as never, { slug: item.slug } as never)}
    >
      <View style={styles.poiIconContainer}>
        <Ionicons name="location" size={24} color={getScoreColor(item.quietScore)} />
      </View>
      <View style={styles.poiInfo}>
        <Text style={styles.poiName}>{item.name}</Text>
        <Text style={styles.poiRegion}>{item.region}</Text>
      </View>
      <View style={[styles.quietScoreBadge, { backgroundColor: `${getScoreColor(item.quietScore)}20` }]}>
        <Text style={[styles.quietScoreText, { color: getScoreColor(item.quietScore) }]}>
          Q{item.quietScore}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vicino a te</Text>
        <Text style={styles.headerSubtitle}>Scopri luoghi quiet nelle vicinanze</Text>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={getLocation} activeOpacity={0.7}>
        <Ionicons name="locate" size={20} color={colors.primary} />
        <Text style={styles.locationButtonText}>
          {userLocation ? locationName : 'Usa la mia posizione'}
        </Text>
        {userLocation && (
          <View style={styles.locationStatus}>
            <Ionicons name="checkmark-circle" size={16} color={colors.secondary} />
          </View>
        )}
      </TouchableOpacity>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={colors.text.tertiary} />
          <Text style={styles.mapText}>Mappa in caricamento...</Text>
          <Text style={styles.mapSubtext}>
            {userLocation 
              ? `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`
              : 'Posizione non disponibile'
            }
          </Text>
        </View>
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Luoghi nelle vicinanze</Text>
        <Text style={styles.resultsCount}>{sortedDestinations.length} risultati</Text>
      </View>

      {/* POI List */}
      <FlatList
        data={sortedDestinations}
        renderItem={renderPOI}
        keyExtractor={item => item.id}
        style={styles.poiList}
        contentContainerStyle={styles.poiListContent}
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.button,
  },
  locationButtonText: {
    flex: 1,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  locationStatus: {
    marginLeft: spacing.xs,
  },
  mapContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    height: 200,
    ...shadows.card,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8E4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: fontSizes.lg,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  mapSubtext: {
    fontSize: fontSizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  resultsTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  resultsCount: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  poiList: {
    flex: 1,
  },
  poiListContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  poiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  poiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  poiInfo: {
    flex: 1,
  },
  poiName: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  poiRegion: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  quietScoreBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  quietScoreText: {
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});
