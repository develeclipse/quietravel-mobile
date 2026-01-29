import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSizes, shadows } from '../constants/theme';

const MOODS = [
  { id: 'relax', label: 'Relax', desc: 'Calma e tranquillità', emoji: '🧘' },
  { id: 'avventura', label: 'Avventura', desc: 'Esplorazione e natura', emoji: '🏔️' },
  { id: 'cultura', label: 'Cultura', desc: 'Storia e arte', emoji: '🏛️' },
  { id: 'natura', label: 'Natura', desc: 'Paesaggi e green', emoji: '🌿' },
  { id: 'food', label: 'Food', desc: 'Enogastronomia locale', emoji: '🍷' },
];

const DURATIONS = [
  { id: '1-day', label: '1 giorno', icon: '📅' },
  { id: '2-3-days', label: '2-3 giorni', icon: '🗓️' },
  { id: '4-7-days', label: '4-7 giorni', icon: '📆' },
  { id: 'week', label: 'Settimana+', icon: '🗓️' },
];

const ACTIVITIES = ['Natura', 'Cultura', 'Food', 'Spiaggia', 'Montagna', 'Arte'];

const REGIONS = [
  'TOSCANA', 'LAZIO', 'CAMPANIA', 'SICILIA', 'PUGLIA', 'SARDEGNA',
  'PIEMONTE', 'LOMBARDIA', 'VENETO', 'EMILIA-ROMAGNA',
];

export default function PianificaScreen() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    mood: '',
    duration: '',
    activities: [] as string[],
    region: '',
  });
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setPreferences({ ...preferences, mood: moodId });
    setStep(2);
  };

  const handleDurationSelect = (durationId: string) => {
    setPreferences({ ...preferences, duration: durationId });
  };

  const toggleActivity = (activity: string) => {
    const newActivities = preferences.activities.includes(activity)
      ? preferences.activities.filter(a => a !== activity)
      : [...preferences.activities, activity];
    setPreferences({ ...preferences, activities: newActivities });
  };

  const generateTours = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to results
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pianifica</Text>
        <Text style={styles.headerSubtitle}>Crea il tuo viaggio perfetto</Text>
      </View>

      {/* Quick Actions */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Create Tour Button */}
        <TouchableOpacity
          style={styles.createTourButton}
          onPress={() => setStep(1)}
          activeOpacity={0.8}
        >
          <Ionicons name="sparkles" size={20} color={colors.white} />
          <Text style={styles.createTourText}>Crea un nuovo viaggio</Text>
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsGrid}>
          {[
            { id: 'match', label: 'Match', icon: 'flash', color: colors.primary, desc: 'Tour rapido' },
            { id: 'confronta', label: 'Confronta', icon: 'git-compare', color: colors.secondary, desc: '2 città' },
            { id: 'alternativa', label: 'Alternativa', icon: 'refresh', color: colors.accent, desc: 'Trova simile' },
          ].map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionCard} onPress={() => {}}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
              <Text style={styles.quickActionDesc}>{action.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Predefined Packages */}
        <View style={styles.packagesCard}>
          <View style={styles.packageIcon}>
            <Ionicons name="calendar" size={20} color={colors.accent} />
          </View>
          <View style={styles.packageInfo}>
            <Text style={styles.packageTitle}>Pacchetti predefiniti</Text>
            <Text style={styles.packageSubtitle}>3 tour pronti all'uso</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
        </View>

        {/* User Content */}
        <View style={styles.userContentSection}>
          <TouchableOpacity style={styles.userContentItem}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.userContentLabel}>I tuoi viaggi</Text>
            <Text style={styles.userContentCount}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userContentItem}>
            <Ionicons name="heart" size={20} color={colors.danger} />
            <Text style={styles.userContentLabel}>Tour salvati</Text>
            <Text style={styles.userContentCount}>0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Step 1: Mood Selection Modal */}
      {step === 1 && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Che atmosfera cerchi?</Text>
              <TouchableOpacity style={styles.modalClose} onPress={() => setStep(0)}>
                <Ionicons name="close" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={styles.moodCard}
                  onPress={() => handleMoodSelect(mood.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <View style={styles.moodInfo}>
                    <Text style={styles.moodLabel}>{mood.label}</Text>
                    <Text style={styles.moodDesc}>{mood.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Step 2: Duration & Activities */}
      {step === 2 && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setStep(1)}>
                <Ionicons name="arrow-back" size={20} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Quanto tempo hai?</Text>
              <View style={styles.modalClose} />
            </View>

            {/* Durations */}
            <View style={styles.section}>
              <View style={styles.durationGrid}>
                {DURATIONS.map((d) => (
                  <TouchableOpacity
                    key={d.id}
                    style={[styles.durationCard, preferences.duration === d.id && styles.durationCardActive]}
                    onPress={() => handleDurationSelect(d.id)}
                  >
                    <Text style={styles.durationIcon}>{d.icon}</Text>
                    <Text style={[styles.durationLabel, preferences.duration === d.id && styles.durationLabelActive]}>
                      {d.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Activities */}
            <Text style={styles.sectionTitle}>Cosa ti interessa?</Text>
            <View style={styles.activitiesRow}>
              {ACTIVITIES.map((activity) => (
                <TouchableOpacity
                  key={activity}
                  style={[styles.activityPill, preferences.activities.includes(activity) && styles.activityPillActive]}
                  onPress={() => toggleActivity(activity)}
                >
                  <Text style={[styles.activityText, preferences.activities.includes(activity) && styles.activityTextActive]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Region */}
            <Text style={styles.sectionTitle}>Regione (opzionale)</Text>
            <View style={styles.regionSelector}>
              <Text style={styles.regionPlaceholder}>Qualsiasi regione</Text>
              <Ionicons name="chevron-down" size={18} color={colors.text.tertiary} />
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={styles.generateButton}
              onPress={generateTours}
              disabled={loading || !preferences.duration}
            >
              <Text style={styles.generateButtonText}>
                {loading ? 'Generando...' : 'Trova destinazioni'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  createTourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: spacing.md,
    ...shadows.button,
  },
  createTourText: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.white,
    marginLeft: spacing.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.card,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  quickActionDesc: {
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  packagesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  packageIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  packageInfo: {
    flex: 1,
  },
  packageTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  packageSubtitle: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  userContentSection: {
    gap: spacing.sm,
  },
  userContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  userContentLabel: {
    flex: 1,
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  userContentCount: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  moodInfo: {
    flex: 1,
  },
  moodLabel: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  moodDesc: {
    fontSize: fontSizes.md,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  durationCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  durationIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  durationLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  durationLabelActive: {
    color: colors.white,
  },
  activitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  activityPill: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activityText: {
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
  activityTextActive: {
    color: colors.white,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  regionPlaceholder: {
    fontSize: fontSizes.lg,
    color: colors.text.secondary,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    ...shadows.button,
  },
  generateButtonText: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.white,
  },
});
