/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";

const FollowingsModal = ({ visible, onClose, followings }) => {
  return (
    <Modal
      title="Followings"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {followings.map((following) => (
        <div key={following.id}>{following.username}</div>
      ))}
    </Modal>
  );
};

export default FollowingsModal;
