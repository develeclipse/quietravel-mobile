import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSizes, shadows } from '../constants/theme';

const ACHIEVEMENTS = [
  { id: 1, title: 'Primo Viaggio', desc: 'Hai creato il tuo primo viaggio', icon: 'airplane', earned: false },
  { id: 2, title: 'Esploratore', desc: 'Hai visitato 5 destinazioni', icon: 'map', earned: false },
  { id: 3, title: 'Quiet Master', desc: 'Hai trovato 3 destinazioni Q90+', icon: 'star', earned: false },
  { id: 4, title: 'Cultura', desc: 'Hai esplorato 10 musei', icon: 'library', earned: false },
  { id: 5, title: 'Natura', desc: 'Hai visitato 5 parchi', icon: 'leaf', earned: false },
  { id: 6, title: 'Foodie', desc: 'Hai assaggiato 5 piatti locali', icon: 'restaurant', earned: false },
];

export default function ProfiloScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profilo</Text>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ospite</Text>
            <Text style={styles.userEmail}>Accedi per salvare i tuoi dati</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          {[
            { label: 'Viaggi', value: '0', icon: 'airplane' },
            { label: 'Salvati', value: '0', icon: 'heart' },
            { label: 'POI', value: '0', icon: 'location' },
            { label: 'Q Media', value: '-', icon: 'stats-chart' },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={20} color={colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Text style={styles.sectionSubtitle}>6 totali</Text>
          </View>

          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((achievement) => (
              <View
                key={achievement.id}
                style={[styles.achievementCard, !achievement.earned && styles.achievementLocked]}
              >
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.earned ? `${colors.primary}20` : '#E8E4EE' }
                ]}>
                  <Ionicons
                    name={achievement.icon as any}
                    size={20}
                    color={achievement.earned ? colors.primary : colors.text.tertiary}
                  />
                </View>
                <Text style={[styles.achievementTitle, !achievement.earned && styles.achievementTitleLocked]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDesc}>{achievement.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Impostazioni</Text>

          {[
            { label: 'Notifiche', icon: 'notifications', color: colors.primary },
            { label: 'Preferenze', icon: 'options', color: colors.secondary },
            { label: 'Lingua', icon: 'globe', color: colors.accent },
            { label: 'Aiuto', icon: 'help-circle', color: '#6366F1' },
            { label: 'Privacy', icon: 'shield-checkmark', color: '#10B981' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIcon, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.settingsLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version */}
        <Text style={styles.version}>QuieTravel v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.text.primary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  userName: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  statCard: {
    width: '23%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    ...shadows.card,
  },
  statValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.primary,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  achievementsSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  achievementCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    ...shadows.card,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  achievementTitle: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: colors.text.tertiary,
  },
  achievementDesc: {
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  settingsSection: {
    marginBottom: spacing.xl,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingsLabel: {
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  version: {
    fontSize: fontSizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
