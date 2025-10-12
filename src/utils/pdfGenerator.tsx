import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { AssessmentResults, BatteryScore } from '../types';
import { batteryInfo, getLevelLabel } from '../data/batteries';
import pdfContentData from '../data/pdfContent.json';

// Map English keys to French names for content lookup
const batteryNameMap: Record<string, string> = {
  physical: 'Physique',
  mental: 'Mentale',
  emotional: 'Émotionnelle',
  identity: 'Identitaire',
  relational: 'Relationnelle',
  professional: 'Professionnelle',
  spiritual: 'Spirituelle',
};

const levelNameMap: Record<string, string> = {
  critical: 'Critique',
  unstable: 'Instable',
  optimal: 'Optimal',
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: '#e8e0d5', // NIIA Beige background
    fontFamily: 'Helvetica',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Main sheet container
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    width: '96%',
    maxWidth: 760,
    maxHeight: '98%',
  },
  
  // Header
  header: {
    textAlign: 'center',
    marginBottom: 6,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 8.5,
    color: '#1c3b5a',
    lineHeight: 1.3,
    opacity: 0.96,
  },
  
  // Layout container
  layoutContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  
  // Main content column
  mainContent: {
    flex: 1,
  },
  
  // Sections
  section: {
    backgroundColor: '#fff',
    padding: 6,
    marginBottom: 4,
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.06)',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1c3b5a',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 3,
  },
  sectionBody: {
    fontSize: 8,
    color: '#1c3b5a',
    lineHeight: 1.3,
  },
  bulletPoint: {
    fontSize: 8,
    color: '#1c3b5a',
    marginBottom: 1.5,
    paddingLeft: 4,
    lineHeight: 1.35,
  },
  quote: {
    fontSize: 8,
    color: '#1c3b5a',
    marginBottom: 1.5,
    paddingLeft: 4,
    lineHeight: 1.3,
  },
  
  // Exercise callout box
  exerciseBox: {
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 0,
    borderRadius: 5,
    borderLeftWidth: 3,
  },
  exerciseMeta: {
    fontSize: 7.5,
    color: '#1c3b5a',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  exerciseStep: {
    fontSize: 8,
    color: '#1c3b5a',
    marginBottom: 1.5,
    paddingLeft: 3,
    lineHeight: 1.3,
  },
  exerciseWhy: {
    fontSize: 7.5,
    color: '#1c3b5a',
    marginTop: 3,
    fontWeight: 'bold',
    lineHeight: 1.25,
  },
  
  // Recommendations
  recoBox: {
    marginBottom: 3,
  },
  recoTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 2,
    marginTop: 3,
  },
  recoItem: {
    fontSize: 7.5,
    color: '#1c3b5a',
    marginBottom: 1.5,
    paddingLeft: 4,
    lineHeight: 1.3,
  },
  
  // Sidebar
  sidebar: {
    width: 70,
    borderRadius: 8,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  battery: {
    width: 38,
    height: 85,
    border: '2px solid #1c3b5a',
    borderRadius: 5,
    position: 'relative',
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  batterySegment: {
    height: 22,
    borderRadius: 3,
    border: '1px solid rgba(0,0,0,0.08)',
  },
  
  // CTA Section
  ctaSection: {
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaEvent: {
    fontSize: 10,
    color: '#1c3b5a',
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  ctaPoints: {
    fontSize: 9,
    color: '#1c3b5a',
    marginBottom: 4,
    lineHeight: 1.5,
  },
  ctaButton: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d96536',
    marginTop: 10,
    textAlign: 'center',
  },
  ctaLimit: {
    fontSize: 8,
    marginTop: 8,
    textAlign: 'center',
    color: '#7e8081',
  },
  
  // Footer
  footer: {
    marginTop: 5,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(130,114,104,0.3)',
  },
  footerText: {
    fontSize: 6.5,
    color: '#7e8081',
    marginBottom: 0.5,
    textAlign: 'center',
  },
  footerBold: {
    fontSize: 7,
    color: '#1c3b5a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 1,
  },

  // Introduction Page Styles
  introSheet: {
    backgroundColor: '#f8f6f3',
    borderRadius: 20,
    padding: 30,
    width: '96%',
    maxWidth: 760,
    maxHeight: '98%',
    borderWidth: 2,
    borderColor: 'rgba(28, 59, 90, 0.1)',
    borderStyle: 'solid',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 20,
    textAlign: 'center',
  },
  introEmoji: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  introImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  introImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    objectFit: 'cover',
  },
  introParagraph: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: '#1c3b5a',
    marginBottom: 12,
    textAlign: 'justify',
  },
  introSignature: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginTop: 15,
    marginBottom: 5,
  },
  introRole: {
    fontSize: 9,
    color: '#7e8081',
    marginBottom: 15,
  },

  // Summary Page Styles
  septogramContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  septogramTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 15,
    textAlign: 'center',
  },
  septogramBattery: {
    fontSize: 10,
    color: '#1c3b5a',
    marginVertical: 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  focusSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(217, 101, 54, 0.08)',
    borderRadius: 12,
  },
  focusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d96536',
    marginBottom: 12,
    textAlign: 'center',
  },
  focusBattery: {
    fontSize: 10,
    color: '#1c3b5a',
    marginVertical: 5,
    paddingLeft: 10,
  },
});

// Helper to get content
const getContent = (battery: string, level: string, field: string): string => {
  const frenchBattery = batteryNameMap[battery];
  const frenchLevel = levelNameMap[level];
  
  try {
    const content = (pdfContentData as any)[frenchBattery]?.[frenchLevel]?.[field];
    return content || '';
  } catch {
    return '';
  }
};

// Helper to get accent color based on level
const getAccentColor = (level: string): string => {
  switch(level) {
    case 'critical': return '#D96536'; // terracotta
    case 'unstable': return '#DEA742'; // amber
    case 'optimal': return '#379191'; // sarcelle
    default: return '#1c3b5a';
  }
};

// Helper to get light background color based on level
const getLightBg = (level: string): string => {
  switch(level) {
    case 'critical': return 'rgba(217, 101, 54, 0.12)';
    case 'unstable': return 'rgba(222, 167, 66, 0.12)';
    case 'optimal': return 'rgba(55, 145, 145, 0.12)';
    default: return 'rgba(28, 59, 90, 0.12)';
  }
};

// Helper to get filled segments count
const getFilledSegments = (level: string): number => {
  switch(level) {
    case 'critical': return 1;
    case 'unstable': return 2;
    case 'optimal': return 3;
    default: return 0;
  }
};

// Battery Detail Page Component
const BatteryDetailPage = ({ batteryScore }: { batteryScore: BatteryScore }) => {
  const info = batteryInfo[batteryScore.battery];
  const levelLabel = getLevelLabel(batteryScore.level);
  const accentColor = getAccentColor(batteryScore.level);
  const lightBg = getLightBg(batteryScore.level);
  const filledSegments = getFilledSegments(batteryScore.level);
  
  // Get content
  const headerSubtitle = getContent(batteryScore.battery, batteryScore.level, 'HEADER_SOUS_TITRE');
  
  // Helper to filter out empty and "—" values
  const isValidContent = (content: string) => content && content.trim() !== '' && content.trim() !== '—';
  
  // INTRO sections
  const introMirror = getContent(batteryScore.battery, batteryScore.level, 'INTRO_MIRROR');
  const introContext = getContent(batteryScore.battery, batteryScore.level, 'INTRO_CONTEXT');
  
  // S1_VIVIS - What you're experiencing
  const vivis = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S1_VIVIS_${i}`))
    .filter(isValidContent);
  
  // S1_TEDIS - What you tell yourself
  const tedis = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S1_TEDIS_${i}`))
    .filter(isValidContent);
  
  // S2_SCI - Scientific explanation
  const science1 = getContent(batteryScore.battery, batteryScore.level, 'S2_SCI_1');
  const scienceExplain1 = getContent(batteryScore.battery, batteryScore.level, 'SCIENCE_1_EXPLAIN');
  const science2 = getContent(batteryScore.battery, batteryScore.level, 'S2_SCI_2');
  const scienceExplain2 = getContent(batteryScore.battery, batteryScore.level, 'SCIENCE_2_EXPLAIN');
  
  // S3_EXO - Exercise
  const exoTitle = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_TITRE');
  const exoIntro = getContent(batteryScore.battery, batteryScore.level, 'EXO_INTRO');
  const exoDuree = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_DUREE');
  const exoMateriel = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_MATERIEL');
  const exoSteps = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S3_EXO_ETAPE_${i}`))
    .filter(isValidContent);
  const exoCloture = getContent(batteryScore.battery, batteryScore.level, 'EXO_CLOTURE');
  const exoPourquoi = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_POURQUOI');
  
  // S4_RECO - Recommendations
  const reco1Title = getContent(batteryScore.battery, batteryScore.level, 'S4_RECO1_TITRE');
  const reco1Items = ['A', 'B', 'C']
    .map(l => getContent(batteryScore.battery, batteryScore.level, `S4_RECO1_${l}`))
    .filter(isValidContent);
  
  const reco2Title = getContent(batteryScore.battery, batteryScore.level, 'S4_RECO2_TITRE');
  const reco2Items = ['A', 'B', 'C']
    .map(l => getContent(batteryScore.battery, batteryScore.level, `S4_RECO2_${l}`))
    .filter(isValidContent);
    
  // CTA and Footer
  const ctaLocal = getContent(batteryScore.battery, batteryScore.level, 'CTA_LOCAL');
  const footerForceCta = getContent(batteryScore.battery, batteryScore.level, 'FOOTER_FORCE_CTA');

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.sheet}>
      {/* Header */}
      <View style={styles.header} wrap={false}>
        <Text style={styles.headerTitle}>Batterie {info.name}</Text>
        <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
          </View>

        {/* Intro Mirror - Emotional Safety */}
        {introMirror && isValidContent(introMirror) && (
          <View style={[styles.section, { marginBottom: 3, padding: 5 }]}>
            <Text style={[styles.sectionBody, { fontStyle: 'italic', fontSize: 7.5 }]}>
              {introMirror}
          </Text>
        </View>
        )}

        {/* Intro Context - Battery specific context */}
        {introContext && isValidContent(introContext) && (
          <View style={[styles.section, { marginBottom: 3, padding: 5 }]}>
            <Text style={styles.sectionBody}>{introContext}</Text>
      </View>
        )}

        {/* Main Layout: Content + Sidebar */}
        <View style={styles.layoutContainer}>
          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Section 1: What you're experiencing */}
      {vivis.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  1. Ce que tu vis
                </Text>
                <View style={styles.sectionBody}>
          {vivis.map((text, i) => (
            <Text key={i} style={styles.bulletPoint}>• {text}</Text>
          ))}
                </View>
        </View>
      )}

            {/* Section 2: What you tell yourself */}
      {tedis.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  2. Ce que tu te dis
                </Text>
                <View style={styles.sectionBody}>
          {tedis.map((text, i) => (
                    <Text key={i} style={styles.quote}>« {text} »</Text>
          ))}
                </View>
        </View>
      )}

            {/* Section 3: What science says */}
            {(science1 || science2) && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  3. Ce que dit la science
                </Text>
                <View style={styles.sectionBody}>
                  {isValidContent(science1) && (
                    <>
                      <Text style={styles.bulletPoint}>• {science1}</Text>
                      {isValidContent(scienceExplain1) && (
                        <Text style={{ fontSize: 7, color: '#5a6268', marginLeft: 10, marginTop: 1, lineHeight: 1.25 }}>
                          → {scienceExplain1}
                        </Text>
                      )}
                    </>
                  )}
                  {isValidContent(science2) && (
                    <>
                      <Text style={[styles.bulletPoint, { marginTop: 2 }]}>• {science2}</Text>
                      {isValidContent(scienceExplain2) && (
                        <Text style={{ fontSize: 7, color: '#5a6268', marginLeft: 10, marginTop: 1, lineHeight: 1.25 }}>
                          → {scienceExplain2}
                        </Text>
                      )}
                    </>
                  )}
                </View>
        </View>
      )}

            {/* Section 4: Exercise */}
      {exoTitle && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  4. Exercice — {exoTitle}
                </Text>
                <View style={[styles.exerciseBox, { borderLeftColor: accentColor, backgroundColor: lightBg }]}>
                  {exoIntro && isValidContent(exoIntro) && (
                    <Text style={styles.sectionBody}>{exoIntro}</Text>
                  )}
          {(exoDuree || exoMateriel) && (
            <Text style={styles.exerciseMeta}>
                      {exoMateriel && `Matériel : ${exoMateriel}`}
            </Text>
          )}
          {exoSteps.map((step, i) => (
                    <Text key={i} style={styles.exerciseStep}>• {step}</Text>
                  ))}
                  {exoPourquoi && isValidContent(exoPourquoi) && (
                    <Text style={styles.exerciseWhy}>Pourquoi ça marche : {exoPourquoi}</Text>
                  )}
                  {exoCloture && isValidContent(exoCloture) && (
                    <Text style={[styles.sectionBody, { marginTop: 3 }]}>{exoCloture}</Text>
                  )}
                </View>
        </View>
      )}

            {/* Section 5: Recommendations */}
      {(reco1Title || reco2Title) && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  5. Recommandations
                </Text>
                <View style={styles.sectionBody}>
          {reco1Title && (
                    <View style={styles.recoBox}>
              <Text style={styles.recoTitle}>{reco1Title}</Text>
              {reco1Items.map((item, i) => (
                        <Text key={i} style={styles.recoItem}>• {item}</Text>
              ))}
            </View>
          )}
          
          {reco2Title && (
                    <View style={styles.recoBox}>
              <Text style={styles.recoTitle}>{reco2Title}</Text>
              {reco2Items.map((item, i) => (
                        <Text key={i} style={styles.recoItem}>• {item}</Text>
              ))}
            </View>
          )}
                </View>
              </View>
            )}

          </View>

          {/* Sidebar with Battery Gauge */}
          <View style={[styles.sidebar, { backgroundColor: lightBg }]}>
            <Text style={[styles.stateLabel, { color: accentColor }]}>{levelLabel.toUpperCase()}</Text>
            <View style={styles.battery}>
              {[3, 2, 1].map((seg) => {
                const segmentStyle = seg <= filledSegments 
                  ? { ...styles.batterySegment, backgroundColor: accentColor }
                  : styles.batterySegment;
                return <View key={seg} style={segmentStyle} />;
              })}
            </View>
            <Text style={{ fontSize: 8, marginTop: 8, textAlign: 'center', color: '#1c3b5a' }}>
              {batteryScore.score}/30
            </Text>
          </View>
        </View>

        {/* CTA Local - Call to Action */}
        {!!ctaLocal && isValidContent(ctaLocal) && (
          <View style={{ 
            marginTop: 5, 
            padding: 6, 
            backgroundColor: `${accentColor}15`, 
            borderRadius: 8,
            borderLeftWidth: 3,
            borderLeftColor: accentColor,
            borderLeftStyle: 'solid'
          }}>
            <Text style={{ fontSize: 7.5, color: '#1c3b5a', lineHeight: 1.3 }}>
              {ctaLocal}
            </Text>
          </View>
        )}

        {/* Footer Force CTA */}
        {footerForceCta && isValidContent(footerForceCta) && (
          <View style={{ marginTop: 4, padding: 5, backgroundColor: 'rgba(28, 59, 90, 0.06)', borderRadius: 6 }}>
            <Text style={{ fontSize: 7, color: '#1c3b5a', textAlign: 'center', fontWeight: 'bold' }}>
              {footerForceCta}
            </Text>
        </View>
      )}

      {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBold}>NIIA Coaching</Text>
          <Text style={styles.footerText}>niia.coach/masterclass-gratuite • contact@niia.coach</Text>
          <Text style={styles.footerText}>@ayoub.sadry • linkedin.com/in/ayoubsadry</Text>
        </View>
      </View>
    </Page>
  );
};

// Introduction Page Component
const IntroductionPage = () => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.introSheet}>
        <Text style={styles.introTitle}>Introduction</Text>
        
        <View style={styles.introImageContainer}>
          <Image 
            src="/ayoub-sadry.png" 
            style={styles.introImage}
          />
        </View>

        <Text style={styles.introParagraph}>
          Si tu te reconnais dans ces mots, sache une chose : tu n'as rien de cassé.
          Ce que tu ressens est un signal, pas une faiblesse.
          Ton corps, ton mental et ton cœur essaient simplement de te dire : "Ralentis, écoute-toi."
        </Text>

        <Text style={styles.introParagraph}>
          Je suis Ayoub Sadry, fondateur de NIIA Coaching.
          J'ai connu moi aussi cette fatigue qui ne part pas, ce vide intérieur malgré la réussite.
          C'est de cette traversée qu'est née la méthode IMPACT — un chemin pour retrouver ton énergie, ta clarté et ton pouvoir intérieur, en reliant neurosciences, conscience et actions simples.
        </Text>

        <Text style={styles.introParagraph}>
          Ce diagnostic n'est pas un test, mais une boussole.
          Il t'aide à voir où ton énergie fuit… pour mieux la restaurer.
          Et si tu veux aller plus loin, la Masterclass du 30 octobre t'accompagnera à transformer cet épuisement silencieux en clarté durable — sans culpabilité, en 30 min par jour.
          </Text>

        <Text style={styles.introParagraph}>
          Parce que tu mérites de te sentir vivant(e), pas juste performant(e).
          </Text>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.introSignature}>Ayoub Sadry</Text>
          <Text style={styles.introRole}>Fondateur de NIIA Coaching</Text>
        </View>
      </View>
    </Page>
  );
};

// Diagnostic Overview Page (Page 2)
const DiagnosticOverviewPage = ({ results }: { results: AssessmentResults }) => {
  // Get the 3 lowest batteries
  const lowestBatteries = [...results.scores].sort((a, b) => a.score - b.score).slice(0, 3);
  
  // Determine overall burnout state
  const getBurnoutState = () => {
    if (results.totalPercentage >= 80) return { label: 'Énergie Optimale', color: '#379191', icon: '✨' };
    if (results.totalPercentage >= 60) return { label: 'Fatigue Modérée', color: '#dea742', icon: '⚡' };
    if (results.totalPercentage >= 40) return { label: 'Épuisement Installé', color: '#d96536', icon: '⚠️' };
    return { label: 'Burn-Out Silencieux', color: '#c63f2a', icon: '🔴' };
  };
  
  const burnoutState = getBurnoutState();
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.sheet}>
        {/* Header */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1c3b5a', textAlign: 'center', marginBottom: 6 }}>
          Diagnostic Burn-Out Silencieux
        </Text>
        <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center', marginBottom: 15 }}>
          Rapport personnel • {new Date().toLocaleDateString('fr-FR')}
        </Text>

        {/* Overall Status */}
        <View style={{ 
          backgroundColor: `${burnoutState.color}15`, 
          padding: 12, 
          borderRadius: 12, 
          marginBottom: 15,
          borderWidth: 2,
          borderColor: `${burnoutState.color}40`,
          borderStyle: 'solid'
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 10, color: '#7e8081', marginBottom: 3 }}>État Général</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: burnoutState.color }}>
                {burnoutState.icon} {burnoutState.label}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: burnoutState.color }}>
                {results.totalPercentage}%
              </Text>
              <Text style={{ fontSize: 8, color: '#7e8081' }}>Score Total</Text>
            </View>
          </View>
        </View>

        {/* Septogram - Visual Wheel-inspired Layout */}
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1c3b5a', marginBottom: 10, textAlign: 'center' }}>
          Tes 7 Batteries de Vie
        </Text>
        
        {/* Septogram Visual Grid */}
        <View style={{ 
          padding: 15, 
          backgroundColor: '#f7f3ec', 
          borderRadius: 12, 
          marginBottom: 15,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 240
        }}>
          {/* Container for wheel */}
          <View style={{ width: 240, height: 240, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* NIIA Center Circle */}
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 23,
              backgroundColor: '#fff',
              borderWidth: 2,
              borderColor: 'rgba(216,202,181,0.7)',
              borderStyle: 'solid',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-22.5px, -22.5px)',
              zIndex: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#243645', letterSpacing: 0.5 }}>
                NIIA
              </Text>
            </View>

            {/* Batteries and Spokes - 7 evenly distributed at 360°/7 = 51.428571° */}
            <View style={{ width: '100%', height: '100%', position: 'relative' }}>
            {results.scores.map((score) => {
              const info = batteryInfo[score.battery];
              const color = score.level === 'optimal' ? '#2E7D7A' : score.level === 'unstable' ? '#E3A33A' : '#D85E36';
              const segments = Math.ceil((score.score / 30) * 4);
              
              // Calculate positions using proper angles (360°/7 = 51.428571°)
              const centerX = 120;
              const centerY = 120;
              const batteryRadius = 90; // Distance from center to batteries
              const niaRadius = 22.5; // NIIA circle radius (45/2)
              const spokeLength = batteryRadius - niaRadius - 8; // Spoke from NIIA edge to near battery edge
              
              // Angle for each battery (in degrees, 0° at top, clockwise)
              const angles: Record<string, number> = {
                mental: 0,           // Top
                identity: 51.43,     // Top-right
                emotional: 102.86,   // Right
                professional: 154.29, // Bottom-right  
                physical: 205.71,    // Bottom-left
                relational: 257.14,  // Left
                spiritual: 308.57,   // Top-left
              };
              
              const angle = angles[score.battery];
              const angleRad = (angle * Math.PI) / 180;
              
              // Calculate battery position
              const batteryX = centerX + batteryRadius * Math.sin(angleRad);
              const batteryY = centerY - batteryRadius * Math.cos(angleRad);
              
              // Calculate spoke starting point (at NIIA circle edge)
              const spokeStartX = centerX + niaRadius * Math.sin(angleRad);
              const spokeStartY = centerY - niaRadius * Math.cos(angleRad);
              
              return (
                <View key={score.battery}>
                  {/* Spoke line - starts from NIIA edge, points to battery */}
                  <View style={{
                    position: 'absolute',
                    left: spokeStartX,
                    top: spokeStartY,
                    width: spokeLength,
                    height: 2,
                    backgroundColor: 'rgba(216,202,181,0.6)',
                    transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg)`,
                    zIndex: 5
                  }} />
                  
                  {/* Battery */}
                  <View style={{ 
                    position: 'absolute', 
                    left: batteryX - 16, 
                    top: batteryY - 22,
                    alignItems: 'center',
                    zIndex: 8
                  }}>
                    <View style={{ 
                      width: 32, 
                      height: 45, 
                      borderWidth: 2, 
                      borderColor: '#243645', 
                      borderRadius: 6,
                      borderStyle: 'solid',
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      backgroundColor: '#fff'
                    }}>
                      {[4, 3, 2, 1].map((seg) => (
                        <View key={seg} style={{
                          height: 8,
                          borderRadius: 2,
                          marginBottom: 1,
                          backgroundColor: seg <= segments ? color : '#f8fafb'
                        }} />
                      ))}
                    </View>
                    <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: '#0f2333', marginTop: 2, textAlign: 'center' }}>
                      {info.name}
                    </Text>
                    <Text style={{ fontSize: 5.5, color: '#243645' }}>
                      {score.score}/30
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
            </View>
          </View>
          
        {/* Priority Batteries with Exercises */}
        <View style={{ 
          backgroundColor: 'rgba(217, 101, 54, 0.08)', 
          padding: 12, 
          borderRadius: 12, 
          marginBottom: 12
        }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#d96536', marginBottom: 8, textAlign: 'center' }}>
            Tes 3 Batteries Prioritaires
          </Text>
          <Text style={{ fontSize: 7.5, color: '#7e8081', textAlign: 'center', marginBottom: 10 }}>
            Focus sur les exercices clés pour recharger ces batteries
          </Text>
          {lowestBatteries.map((score, index) => {
            const info = batteryInfo[score.battery];
            const exoTitle = getContent(score.battery, score.level, 'S3_EXO_TITRE');
            
            return (
              <View key={score.battery} style={{ marginBottom: 8 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  backgroundColor: 'rgba(217, 101, 54, 0.12)',
                  borderRadius: 6
                }}>
                  <Text style={{ fontSize: 9, color: '#1c3b5a', fontWeight: 'bold' }}>
                    {index + 1}. {info.name}
                  </Text>
                  <Text style={{ fontSize: 8, color: score.level === 'optimal' ? '#379191' : score.level === 'unstable' ? '#dea742' : '#d96536', fontWeight: 'bold' }}>
                    {score.score}/30
                  </Text>
                </View>
                {exoTitle && (
                  <Text style={{ fontSize: 7, color: '#5a6268', marginLeft: 12, marginTop: 2, fontStyle: 'italic' }}>
                    → Exercice : {exoTitle}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
        
        {/* Masterclass CTA Button */}
        <View style={{ 
          backgroundColor: '#d96536', 
          padding: 10, 
          borderRadius: 10, 
          marginTop: 10,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
            Masterclass Gratuite du 30 Octobre
          </Text>
          <Text style={{ fontSize: 7.5, color: '#fff', textAlign: 'center', marginBottom: 6 }}>
            Transforme ton épuisement en clarté durable (30 min/jour)
          </Text>
          <Text style={{ fontSize: 8, color: '#fff', fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.5 }}>
            niia.coach/masterclass-gratuite
          </Text>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(130,114,104,0.2)', borderTopStyle: 'solid' }}>
          <Text style={{ fontSize: 6.5, color: '#7e8081', textAlign: 'center' }}>
            Les pages suivantes contiennent des exercices détaillés, recommandations scientifiques et actions concrètes pour chaque batterie
          </Text>
        </View>
        </View>
      </Page>
  );
};

// Main PDF Document
const PDFDocument = ({ results }: { results: AssessmentResults }) => {
  // Get the 3 lowest batteries for highlighting
  const lowestBatteries = [...results.scores].sort((a, b) => a.score - b.score).slice(0, 3);
  const lowestBatteryTypes = lowestBatteries.map(b => b.battery);
  
  return (
    <Document>
      {/* Page 1: Introduction */}
      <IntroductionPage />

      {/* Page 2: Diagnostic Overview with Septogram, State, Score & Priority Batteries */}
      <DiagnosticOverviewPage results={results} />

      {/* Pages 3-9: Battery detail pages - ALL 7 batteries, prioritize the 3 lowest first */}
      {lowestBatteries.map((score) => (
        <BatteryDetailPage key={score.battery} batteryScore={score} />
      ))}
      
      {/* Remaining batteries */}
      {results.scores
        .filter(score => !lowestBatteryTypes.includes(score.battery))
        .map((score) => (
        <BatteryDetailPage key={score.battery} batteryScore={score} />
      ))}

      {/* Final CTA Page */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.sheet, { justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }]}>
          {/* Closing Message */}
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1c3b5a', textAlign: 'center', marginBottom: 20 }}>
            Tu as fait le premier pas.
          </Text>
          
          <Text style={{ fontSize: 10, color: '#1c3b5a', textAlign: 'center', lineHeight: 1.6, marginBottom: 20, paddingHorizontal: 40 }}>
            Ce diagnostic t'a révélé où ton énergie fuit. Maintenant, il est temps d'apprendre à la restaurer durablement.
          </Text>

          {/* Masterclass Box */}
          <View style={{ 
            width: '85%',
            backgroundColor: 'rgba(217, 101, 54, 0.08)', 
            padding: 25, 
            borderRadius: 16, 
            marginBottom: 25,
            borderWidth: 2,
            borderColor: 'rgba(217, 101, 54, 0.2)',
            borderStyle: 'solid'
          }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1c3b5a', marginBottom: 12, textAlign: 'center' }}>
              Masterclass Gratuite (90 min)
            </Text>
            <Text style={{ fontSize: 10, color: '#1c3b5a', marginBottom: 15, textAlign: 'center', lineHeight: 1.6, fontStyle: 'italic' }}>
              Comment transformer ton épuisement silencieux en clarté intérieure et pouvoir personnel grâce à la méthode IMPACT
            </Text>
            
            <Text style={{ fontSize: 10, color: '#1c3b5a', marginBottom: 15, textAlign: 'center', fontWeight: 'bold' }}>
              30 octobre 2025 à 20h00 (Heure de Paris)
            </Text>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 9, color: '#1c3b5a', lineHeight: 1.5, marginBottom: 3 }}>
                • Pourquoi les pauses ne guérissent jamais le burn-out silencieux
          </Text>
              <Text style={{ fontSize: 9, color: '#1c3b5a', lineHeight: 1.5, marginBottom: 3 }}>
                • Pourquoi ton intelligence est ton atout pour sortir de l'épuisement
          </Text>
              <Text style={{ fontSize: 9, color: '#1c3b5a', lineHeight: 1.5, marginBottom: 3 }}>
                • La méthode IMPACT : RESET — REBUILD — RISE
          </Text>
        </View>
        
            {/* Button */}
            <View style={{ 
              backgroundColor: '#d96536', 
              padding: 12, 
              borderRadius: 10,
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 11, color: '#fff', fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.5 }}>
                RÉSERVER MA PLACE
              </Text>
              <Text style={{ fontSize: 8, color: '#fff', textAlign: 'center', marginTop: 4 }}>
                niia.coach/masterclass-gratuite
          </Text>
            </View>
            
            <Text style={{ fontSize: 7.5, color: '#7e8081', marginTop: 10, textAlign: 'center', fontStyle: 'italic' }}>
              Places limitées • 50 personnes max
                </Text>
        </View>
        
          {/* Final Quote */}
          <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center', fontStyle: 'italic', marginBottom: 30, paddingHorizontal: 50 }}>
            "Tu mérites de te sentir vivant(e), pas juste performant(e)."
          </Text>
          
          {/* Footer */}
          <View style={{ paddingTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(130,114,104,0.2)', borderTopStyle: 'solid', width: '85%' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1c3b5a', textAlign: 'center', marginBottom: 5 }}>
              NIIA Coaching
          </Text>
            <Text style={{ fontSize: 8, color: '#7e8081', textAlign: 'center', marginBottom: 2 }}>
              Neural Intelligence & Inner Authority — Renaissance Souveraine™
          </Text>
            <Text style={{ fontSize: 8, color: '#7e8081', textAlign: 'center', marginBottom: 1 }}>
              contact@niia.coach • @ayoub.sadry
          </Text>
            <Text style={{ fontSize: 8, color: '#7e8081', textAlign: 'center' }}>
              linkedin.com/in/ayoubsadry
          </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Main export function
export const generatePDF = async (results: AssessmentResults) => {
  try {
    const blob = await pdf(<PDFDocument results={results} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostic-7-batteries-${results.firstName.toLowerCase()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Erreur lors de la generation du PDF. Veuillez reessayer.');
  }
};
