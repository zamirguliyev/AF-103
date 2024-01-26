/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";

const FollowersModal = ({ visible, onClose, followers }) => {
  return (
    <Modal
      title="Followers"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {followers.map((follower) => (
        <div key={follower.id}>{follower.username}</div>
      ))}
    </Modal>
  );
};

export default FollowersModal;
