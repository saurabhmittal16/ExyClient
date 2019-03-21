import React from 'react';
import { Modal, Button } from 'antd';

const ErrorComponent = (props) => (
    <Modal
        visible={true}
        closable={false}
        footer={[
            <Button key="submit" type="primary"  onClick={() => props.history.goBack()}>Ok</Button>
        ]}
    >
        There was some problem with the server. Try again later.
    </Modal>
)

export default ErrorComponent;