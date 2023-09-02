import { useDispatch, useSelector } from "react-redux";
import brand from "../assets/imgs/logo.png";
import { useParams } from "react-router-dom";
import { checkGroup, groupStart } from "../states/GroupSlice";
import GroupService from "../services/GroupService";
import { useEffect } from "react";
import "../assets/css/print.css";

const QRCodeBlank = ({ students }) => {
  const { group_id } = useParams();
  const dispatch = useDispatch();

  const { loading, group } = useSelector((state) => state.groups);

  const getGroup = async () => {
    dispatch(groupStart());
    try {
      const response = await GroupService.check_group(group_id);
      dispatch(checkGroup(response.data));
    } catch (error) {
      alert("Xatolik, qaytadan urining");
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          columnGap: "10px",
        }}
      >
        {group &&
          group.students.map((student) => (
            <div
              style={{
                textAlign: "center",
                border: "1px solid #333",
                padding: 15,
              }}
            >
              <img
                style={{ width: "80%" }}
                src={`https://edu.mediazone.uz/django/${student.barcode}.png`}
              />
              <div>{student.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QRCodeBlank;
