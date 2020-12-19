import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const Footer = () => (
    <View style={styles.footerContainer}>
      <Button style={styles.footerControl} size='small' status='success' onPress={props.onConfirm}>
        YES
      </Button>
      <Button style={styles.footerControl} size='small' status='danger' onPress={props.onCancel}>
        NO
      </Button>
    </View>
  );

  return (
    <Modal
      style={styles.container}
      visible={props.isVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={props.onCancel}
    >
      <Card disabled={true} footer={Footer}>
        <Text category='s1'>Are you sure?</Text>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
    width: 200,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
