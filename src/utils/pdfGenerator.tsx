import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { AssessmentResults, BatteryScore } from '../types';
import { batteryInfo, getLevelLabel, getLevelColor } from '../data/batteries';
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
    padding: 18,
    width: '96%',
    maxWidth: 760,
    maxHeight: '98%',
  },
  
  // Header
  header: {
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#1c3b5a',
    lineHeight: 1.4,
    opacity: 0.96,
  },
  
  // Layout container
  layoutContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  
  // Main content column
  mainContent: {
    flex: 1,
  },
  
  // Sections
  section: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 6,
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.06)',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1c3b5a',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 5,
    display: 'inline-block',
  },
  sectionBody: {
    fontSize: 9,
    color: '#1c3b5a',
    lineHeight: 1.35,
  },
  bulletPoint: {
    fontSize: 9,
    color: '#1c3b5a',
    marginBottom: 2,
    paddingLeft: 5,
    lineHeight: 1.35,
  },
  quote: {
    fontSize: 9,
    color: '#1c3b5a',
    marginBottom: 2,
    paddingLeft: 5,
    lineHeight: 1.35,
  },
  
  // Exercise callout box
  exerciseBox: {
    backgroundColor: '#fff',
    padding: 6,
    marginBottom: 0,
    borderRadius: 5,
    borderLeftWidth: 4,
  },
  exerciseMeta: {
    fontSize: 8,
    color: '#1c3b5a',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  exerciseStep: {
    fontSize: 9,
    color: '#1c3b5a',
    marginBottom: 2,
    paddingLeft: 4,
    lineHeight: 1.35,
  },
  exerciseWhy: {
    fontSize: 8,
    color: '#1c3b5a',
    marginTop: 5,
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  
  // Recommendations
  recoBox: {
    marginBottom: 5,
  },
  recoTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1c3b5a',
    marginBottom: 3,
    marginTop: 5,
  },
  recoItem: {
    fontSize: 8.5,
    color: '#1c3b5a',
    marginBottom: 2,
    paddingLeft: 5,
    lineHeight: 1.35,
  },
  
  // Sidebar
  sidebar: {
    width: 75,
    borderRadius: 8,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  battery: {
    width: 40,
    height: 90,
    border: '2px solid #1c3b5a',
    borderRadius: 5,
    position: 'relative',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  batterySegment: {
    height: 23,
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
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(130,114,104,0.3)',
  },
  footerText: {
    fontSize: 7,
    color: '#7e8081',
    marginBottom: 1,
    textAlign: 'center',
  },
  footerBold: {
    fontSize: 7.5,
    color: '#1c3b5a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
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
  
  // S1_VIVIS - What you're experiencing
  const vivis = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S1_VIVIS_${i}`))
    .filter(Boolean);
  
  // S1_TEDIS - What you tell yourself
  const tedis = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S1_TEDIS_${i}`))
    .filter(Boolean);
  
  // S2_SCI - Scientific explanation
  const science = [1, 2, 3, 4, 5]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S2_SCI_${i}`))
    .filter(Boolean);
  
  // S3_EXO - Exercise
  const exoTitle = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_TITRE');
  const exoDuree = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_DUREE');
  const exoMateriel = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_MATERIEL');
  const exoSteps = [1, 2, 3, 4, 5, 6]
    .map(i => getContent(batteryScore.battery, batteryScore.level, `S3_EXO_ETAPE_${i}`))
    .filter(Boolean);
  const exoPourquoi = getContent(batteryScore.battery, batteryScore.level, 'S3_EXO_POURQUOI');
  
  // S4_RECO - Recommendations
  const reco1Title = getContent(batteryScore.battery, batteryScore.level, 'S4_RECO1_TITRE');
  const reco1Items = ['A', 'B', 'C']
    .map(l => getContent(batteryScore.battery, batteryScore.level, `S4_RECO1_${l}`))
    .filter(Boolean);
  
  const reco2Title = getContent(batteryScore.battery, batteryScore.level, 'S4_RECO2_TITRE');
  const reco2Items = ['A', 'B', 'C']
    .map(l => getContent(batteryScore.battery, batteryScore.level, `S4_RECO2_${l}`))
    .filter(Boolean);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.headerTitle}>Batterie {info.name}</Text>
          <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
        </View>

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
            {science.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeader, { backgroundColor: lightBg }]}>
                  3. Ce que dit la science
                </Text>
                <View style={styles.sectionBody}>
                  {science.map((text, i) => (
                    <Text key={i} style={styles.bulletPoint}>• {text}</Text>
                  ))}
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
                  {(exoDuree || exoMateriel) && (
                    <Text style={styles.exerciseMeta}>
                      {exoMateriel && `Matériel : ${exoMateriel}`}
                    </Text>
                  )}
                  {exoSteps.map((step, i) => (
                    <Text key={i} style={styles.exerciseStep}>• {step}</Text>
                  ))}
                  {exoPourquoi && (
                    <Text style={styles.exerciseWhy}>Pourquoi ça marche : {exoPourquoi}</Text>
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
              {[3, 2, 1].map((seg) => (
                <View 
                  key={seg}
                  style={[
                    styles.batterySegment,
                    seg <= filledSegments && { backgroundColor: accentColor }
                  ]} 
                />
              ))}
            </View>
            <Text style={{ fontSize: 8, marginTop: 8, textAlign: 'center', color: '#1c3b5a' }}>
              {batteryScore.score}/30
            </Text>
          </View>
        </View>

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

// Main PDF Document
const PDFDocument = ({ results }: { results: AssessmentResults }) => {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.sheet, { justifyContent: 'center' }]}>
          <View wrap={false}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1c3b5a', marginBottom: 12, textAlign: 'center' }}>
              Diagnostic des 7 Batteries
            </Text>
            <Text style={{ fontSize: 14, color: '#1c3b5a', marginBottom: 30, textAlign: 'center' }}>
              {results.firstName} {results.lastName}, voici ton analyse complète
            </Text>
          </View>
          
          <View style={{ backgroundColor: 'rgba(28, 59, 90, 0.06)', padding: 25, borderRadius: 16, marginBottom: 20 }} wrap={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 42, fontWeight: 'bold', color: '#1c3b5a' }}>{results.totalScore}</Text>
                <Text style={{ fontSize: 11, color: '#7e8081' }}>/210 points</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 42, fontWeight: 'bold', color: '#379191' }}>{results.totalPercentage}%</Text>
                <Text style={{ fontSize: 11, color: '#7e8081' }}>Score global</Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 12, color: '#1c3b5a', textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
              {results.profile}
            </Text>
          </View>
          
          <View style={{ marginTop: 30 }} wrap={false}>
            <Text style={{ fontSize: 10, color: '#7e8081', textAlign: 'center', marginBottom: 4 }}>
              NIIA - Neural Intelligence & Inner Authority
            </Text>
            <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center' }}>
              Ayoub Sadry • contact@niia.coach
            </Text>
          </View>
        </View>
      </Page>

      {/* Battery detail pages */}
      {results.scores.map((score) => (
        <BatteryDetailPage key={score.battery} batteryScore={score} />
      ))}

      {/* Final CTA Page */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.sheet, { justifyContent: 'space-between' }]}>
          <View>
            <View style={{ backgroundColor: 'rgba(217, 101, 54, 0.12)', padding: 20, borderRadius: 16, marginBottom: 20 }} wrap={false}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1c3b5a', marginBottom: 10, textAlign: 'center' }}>
                MASTERCLASS GRATUITE (90 min)
              </Text>
              <Text style={{ fontSize: 11, color: '#1c3b5a', marginBottom: 15, textAlign: 'center', lineHeight: 1.6, fontStyle: 'italic' }}>
                Comment transformer ton épuisement silencieux en clarté intérieure et pouvoir personnel grâce à la méthode IMPACT
              </Text>
              <Text style={{ fontSize: 11, color: '#1c3b5a', marginBottom: 8, textAlign: 'center', fontWeight: 'bold' }}>
                30 octobre 2025 à 20h00 (Heure de Paris)
              </Text>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 10, color: '#1c3b5a', lineHeight: 1.6, marginBottom: 4 }}>
                  • Pourquoi les pauses et vacances ne guérissent jamais vraiment le burn out silencieux
                </Text>
                <Text style={{ fontSize: 10, color: '#1c3b5a', lineHeight: 1.6, marginBottom: 4 }}>
                  • Pourquoi ton intelligence est ton plus grand atout pour sortir de l'épuisement
                </Text>
                <Text style={{ fontSize: 10, color: '#1c3b5a', lineHeight: 1.6, marginBottom: 4 }}>
                  • Pourquoi attendre d'avoir du temps libre te condamne au burn out silencieux
                </Text>
                <Text style={{ fontSize: 10, color: '#1c3b5a', lineHeight: 1.6, fontWeight: 'bold', marginTop: 6 }}>
                  + La méthode IMPACT : RESET — REBUILD — RISE
                </Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d96536', marginTop: 10, textAlign: 'center' }}>
                https://www.niia.coach/masterclass-gratuite
              </Text>
              <Text style={{ fontSize: 9, color: '#7e8081', marginTop: 8, textAlign: 'center' }}>
                Places limitées : 50 personnes max
              </Text>
            </View>
            
            <View style={{ backgroundColor: 'rgba(28, 59, 90, 0.06)', padding: 20, borderRadius: 16 }} wrap={false}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#1c3b5a', marginBottom: 12 }}>
                Tes priorités immédiates
              </Text>
              {results.scores
                .filter(s => s.level !== 'optimal')
                .sort((a, b) => a.score - b.score)
                .slice(0, 3)
                .map((score, i) => {
                  const info = batteryInfo[score.battery];
                  const accentColor = getAccentColor(score.level);
                  return (
                    <Text key={i} style={{ fontSize: 10, color: '#1c3b5a', marginBottom: 8, lineHeight: 1.5 }}>
                      {i + 1}. <Text style={{ fontWeight: 'bold', color: accentColor }}>Batterie {info.name}</Text> ({score.score}/30) - Consulte ta page détaillée
                    </Text>
                  );
                })}
            </View>
          </View>
          
          <View style={{ marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(130,114,104,0.3)' }} wrap={false}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1c3b5a', textAlign: 'center', marginBottom: 6 }}>
              NIIA Coaching
            </Text>
            <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center', marginBottom: 2 }}>
              Neural Intelligence & Inner Authority
            </Text>
            <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center', marginBottom: 2 }}>
              niia.coach/masterclass-gratuite • contact@niia.coach
            </Text>
            <Text style={{ fontSize: 9, color: '#7e8081', textAlign: 'center' }}>
              @ayoub.sadry • linkedin.com/in/ayoubsadry
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
