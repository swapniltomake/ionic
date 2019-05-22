import React, { Component } from 'react';
import { LifeCycleContext } from './navigation/LifeCycleContext';


type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface InternalProps extends React.HTMLAttributes<HTMLDivElement> {
  forwardedRef?: React.RefObject<HTMLDivElement>
};

type ExternalProps = Props & {
  ref?: React.RefObject<HTMLDivElement>
};

class IonPage extends Component<InternalProps> {
  context!: React.ContextType<typeof LifeCycleContext>;

  constructor(props: InternalProps) {
    super(props);
  }

  componentDidMount() {
    const { forwardedRef } = this.props;
    this.context.parent = forwardedRef;
    // if(forwardedRef && forwardedRef.current) {
    //   forwardedRef.current.addEventListener('ionViewWillEnter', this.ionViewWillEnterHandler.bind(this));
    // }
  }

  // componentWillUnmount() {
  //   const { forwardedRef } = this.props;
  //   if(forwardedRef && forwardedRef.current) {
  //     forwardedRef.current.removeEventListener('ionViewWillEnter', this.ionViewWillEnterHandler.bind(this));
  //   }
  // }

  ionViewWillEnterHandler() {
    // this.context.ionViewWillEnter();
  }

  render() {
    const { className, children, forwardedRef, ...rest } = this.props;
    return (
      <LifeCycleContext.Provider value={{parent: forwardedRef}}>
      <div
        className={className ? `ion-page ${className}` : 'ion-page'}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </div>
      </LifeCycleContext.Provider>
    )
  }
}

function forwardRef(props: InternalProps, ref: React.RefObject<HTMLDivElement>) {
  return <IonPage forwardedRef={ref} {...props}  />;
}
forwardRef.displayName = 'IonPage';

IonPage.contextType = LifeCycleContext;

export default React.forwardRef<HTMLDivElement, ExternalProps>(forwardRef);

// class DefaultLifeCycleContext implements LifeCycleContextInterface {

//   callback: Function;

//   constructor() {
//     console.log('dlcc ctor');
//   }

//   onIonViewWillEnter(callback: Function) {
//     this.callback = callback;
//   }

//   ionViewWillEnter() {
//     console.log('ionViewWillEnter in context')
//     if (this.callback) {
//       this.callback();
//     }
//   }
// }
