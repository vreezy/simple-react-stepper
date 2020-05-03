import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { getGUID } from "@pnp/common";
import { Icon } from '@fluentui/react/lib/Icon';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { AnimationStyles, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import styles from './StepperSimple.module.scss';
// notes:
// https://quasar.dev/vue-components/stepper#Installation
// https://developer.microsoft.com/de-DE/fluentui#/controls/web/text
// https://github.com/OfficeDev/hands-on-labs/blob/master/O3652/O3652-1%20Deep%20Dive%20in%20Office%20Outlook%20Add-ins/Completed%20Projects/Translator/TranslatorWeb/Content/sass/_Fabric.Color.Variables.scss
// https://github.com/OfficeDev/office-ui-fabric-core/blob/master/src/sass/_Animation.scss

export enum StepperSimpleStyle {
    Bar,
    NextButton,
    BackButton
}

export interface IStepperSimpleOption {
    text: string;
    icon?: string;
    buttonNextText?: string;
    buttonBackText?: string;
}

export interface IStepperSimpleProps {
    selectedIndex?: number;
    items?: IStepperSimpleOption[];
    style?: StepperSimpleStyle;
    disabled?: boolean;
    visible?: boolean;
    onChange(value: number): void;
}

export function StepperSimple(props: IStepperSimpleProps) {
    const selectedIndex: number = props.selectedIndex || 0;
    const items: IStepperSimpleOption[] = props.items || [];
    const style: StepperSimpleStyle =  props.style || StepperSimpleStyle.Bar;
    const disabled: boolean = props.disabled || false;
    const visible: boolean = props.visible || true;
    
    const isFirst = selectedIndex === 0 ;
    const isLast = items.length === selectedIndex + 1 ;
    // const isPast = () => { return }




    const itemsView: React.ReactNode[] = items.map((item: IStepperSimpleOption, index: number) => {
        const isPast = index < selectedIndex;
        const isActive = index === selectedIndex;
        const isFuther = index > selectedIndex;

        if(style === StepperSimpleStyle.NextButton && isActive) {
            return (
                <StepperButton
                    key={getGUID()}
                    index={0}
                    selectedIndex={selectedIndex + 1}
                    style={StepperSimpleStyle.NextButton}
                    disabled={disabled}
                    onChange={props.onChange}
                    item={item}
                    isFirst={isFirst}
                    isLast={isLast}
                    isPast={isPast}
                    isActive={isActive}
                    isFuther={isFuther}
                    visible={visible}
                />
            );
        }

        if(style === StepperSimpleStyle.BackButton && isActive) {
            return (

                <StepperButton
                    index={0}
                    key={getGUID()}
                    selectedIndex={selectedIndex - 1}
                    style={StepperSimpleStyle.BackButton}
                    disabled={disabled}
                    onChange={props.onChange}
                    item={item}
                    isFirst={isFirst}
                    isLast={isLast}
                    isPast={isPast}
                    isActive={isActive}
                    isFuther={isFuther}
                    visible={visible}
                />

            );
        }

        if(style === StepperSimpleStyle.Bar) {
            return (
                <StepperBar
                    key={getGUID()}
                    index={index}
                    selectedIndex={selectedIndex}
                    style={StepperSimpleStyle.Bar}
                    disabled={disabled}
                    onChange={props.onChange}
                    item={item}
                    isFirst={isFirst}
                    isLast={isLast}
                    isPast={isPast}
                    isActive={isActive}
                    isFuther={isFuther}
                    visible={visible}
                />
            );
        }

        return null;

    });

    return (
      <div className={styles.container}>
          {itemsView.map((item: React.ReactNode) => {
              return item;
          })}
      </div>
    );
}
  
export default StepperSimple;

export interface IStepperSimpleElement {
    index: number;
    selectedIndex: number;
    style: StepperSimpleStyle;
    disabled: boolean;
    visible: boolean
    onChange(value: number): void;
    item: IStepperSimpleOption;
    isFirst: boolean;
    isLast: boolean;
    isPast: boolean;
    isActive: boolean;
    isFuther: boolean;
}

function StepperButton(props: IStepperSimpleElement) {
    const getText = () => {
        if(props.style === StepperSimpleStyle.NextButton) {
            if(props.item.buttonNextText) {
                return props.item.buttonNextText;
            }
            return "Weiter"
        }

        if(props.style === StepperSimpleStyle.BackButton) {
            if(props.item.buttonBackText) {
                return props.item.buttonBackText;
            }
            return "Zurück"
        }

        return "Button?";
    }

    if(props.visible) {
        return (
            <div>
                <PrimaryButton text={getText()} onClick={() =>props.onChange(props.selectedIndex)} disabled={props.disabled} />
            </div>
        )
    }
    return null;
}

function StepperBar(props: IStepperSimpleElement) {
    if(props.visible) {

        const getIcon = () => {
            if(props.isPast) {
                return ( <Icon iconName="CheckMark"/> )
            }
            if(props.item.icon) {
                return ( <Icon iconName={props.item.icon}/> )
            }
            return props.index + 1 + "."
        }

        const getTextContainerStyle = () => {
            if(props.isPast) {
                return mergeStyles(styles.textContainer, styles.past);
            }

            if(props.isActive) {
                return mergeStyles(styles.textContainer, styles.active);
            }

            if(props.isFuther) {
                return mergeStyles(styles.textContainer, styles.futher);
            }
            
            return mergeStyles(styles.textContainer);
        }

        const getIconConatianerStyle = () => {
            if(props.isPast) {
                return mergeStyles(styles.iconContainer, styles.past);
            }

            if(props.isActive) {
                return mergeStyles(styles.iconContainer, styles.active);
            }

            if(props.isFuther) {
                return mergeStyles(styles.iconContainer, styles.futher);
            }
            
            return mergeStyles(styles.iconContainer);
        }

        const getColorLineStyle = () => {
            if(props.isPast) {
                return mergeStyles(styles.colorLine, styles.pastLine);
            }

            if(props.isActive) {
                return mergeStyles(styles.colorLine, styles.activeLine);
            }

            if(props.isFuther) {
                return mergeStyles(styles.colorLine, styles.futherLine);
            }
            
            return mergeStyles(styles.colorLine);
        }

        // AnimationStyles.ms-motion-slideLeftIn

        const getBarContainerStyle = () => {
            if(props.isActive) {
                return mergeStyles(styles.barContainer, AnimationStyles.slideLeftIn40); //  fadeIn200
            }

            return mergeStyles(styles.barContainer)
        }
        
        return (
            <div>
            <div className={getBarContainerStyle()}>
                
                    <div className={styles.circle}>
                        <span className={getIconConatianerStyle()}>
                            {getIcon()}   
                        </span>
                    </div>
                    <div className={getTextContainerStyle()}>
                        <Text variant={"small"}>{props.item.text}</Text>
                    </div>

                    
            </div>
            <div className={getColorLineStyle()}></div>
            </div>
        )
    }
    return null;
}