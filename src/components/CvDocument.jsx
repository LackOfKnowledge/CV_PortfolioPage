// Plik: src/components/CvDocument.jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// TODO: Rozwiąż problem rejestracji fontów na serwerze lub użyj fontów standardowych (Helvetica, Times-Roman, Courier)
/*
try {
    Font.register({ family: 'Chivo', fonts: [ /* ... ścieżki do plików .ttf ... * / ] });
} catch (e) { console.error("Font registration failed:", e); }
*/

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
  }, // Użycie standardowego fontu
  section: { marginBottom: 15 },
  heading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#0B57D0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
  },
  subheading: { fontSize: 11, fontWeight: "bold", marginBottom: 3 },
  text: { marginBottom: 3, lineHeight: 1.4 },
  listItem: { marginBottom: 6 },
  skillCategory: { fontSize: 11, fontWeight: "bold", marginBottom: 4 },
  skillList: { marginBottom: 3 },
});

// Komponent CV - wymaga rozbudowy!
const CvDocument = ({ personalData, experience, skills }) => (
  <Document title={`CV - ${personalData?.name || "CV"}`}>
    <Page
      size="A4"
      style={styles.page}
    >
      {/* Sekcja Danych Osobowych */}
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          {personalData?.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            marginBottom: 10,
            color: "#555",
          }}
        >
          {personalData?.title}
        </Text>
        {/* TODO: Dodaj dane kontaktowe (email, tel, linki) */}
      </View>

      {/* Sekcja Doświadczenia */}
      {experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Doświadczenie</Text>
          {experience.map((item, index) => (
            <View
              key={index}
              style={styles.listItem}
            >
              <Text style={styles.subheading}>
                {item.title} - {item.company}
              </Text>
              <Text style={{ fontSize: 8, color: "#666", marginBottom: 2 }}>
                {item.dates}
              </Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Sekcja Umiejętności */}
      {skills && Object.keys(skills).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Umiejętności</Text>
          {Object.entries(skills).map(([category, skillList]) => (
            <View
              key={category}
              style={{ marginBottom: 5 }}
            >
              <Text style={styles.skillCategory}>{category}:</Text>
              <Text style={styles.skillList}>
                {skillList.map((s) => s.name).join(" • ")}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* TODO: Dodaj sekcje Edukacja, Języki, Zainteresowania, Klauzula RODO */}
      <View
        style={{
          position: "absolute",
          fontSize: 7,
          bottom: 15,
          left: 30,
          right: 30,
          textAlign: "center",
          color: "grey",
        }}
      >
        Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb
        niezbędnych do realizacji procesu rekrutacji... (itd.)
      </View>
    </Page>
  </Document>
);

export default CvDocument;
