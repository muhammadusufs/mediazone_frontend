// Library imports
import moment from "moment";
import "moment/locale/uz-latn";

import {
  Page,
  Document,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import brand from "../assets/imgs/logo.png";

const QRCodeBlank = ({ students }) => (
  <Document>
    <Page style={styles.body}>
      {students &&
        students.map((student) => (
          <View style={styles.card}>
            <Image
              style={styles.image}
              src={`http://edu.mediazone.uz/django/${student.barcode}.png`}
            />
            <Text style={styles.name}>{student.name}</Text>
          </View>
        ))}
    </Page>
  </Document>
);

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
    rowGap: 15,
    justifyContent: "space-between",
  },
  card: {
    border: "1px solid #333",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "30%",
  },
  image: {
    width: "100%",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    padding: 10,
  },
});
export default QRCodeBlank;
