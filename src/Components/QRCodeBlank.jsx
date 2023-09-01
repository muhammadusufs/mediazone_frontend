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

const QRCodeBlank = ({}) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.card}>
        <Image style={styles.image} src={brand} />
      </View>
      <Text style={styles.discount}>
        Jami chiqim miqdori : {parseFloat(total).toLocaleString()}
      </Text>
    </Page>
  </Document>
);

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  card: {
    display: "inline-block",
    padding: "15px",
    border: "1px solid #333",
    margin: "15px",
  },
  image: {
    widht: "100%",
  },
});
export default QRCodeBlank;
