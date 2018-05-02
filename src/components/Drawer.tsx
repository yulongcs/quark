import * as React from 'react';

interface Props {
  children: React.ReactNode;
  visible?: boolean;
  onClose?: Function;
}

class DrawerComponent extends React.Component<Props, {}> {

  handleMaskClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { children, visible } = this.props;

    return visible ? (
      <div style={{ zIndex: 1300, position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div onClick={this.handleMaskClick} style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,.3)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: '60vw', height: '100%', background: '#fff' }}>{children}</div>
      </div>
    ) : null;
  }
}

export default DrawerComponent; 
