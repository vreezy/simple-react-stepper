import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { getGUID } from "@pnp/common";
import { Icon } from '@fluentui/react/lib/Icon';

import styles from './StepperSimple.module.scss';

// export enum StepperSimpleDesign {
//     Button,
//     Bar
// }

export enum StepperSimpleStyle {
    Bar,
    NextButton,
    BackButton
}

// export enum StepperSimpleTense {
//     Past = "past",
//     Active = "active",
//     Futher = "futher"
// }

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
                <div className={styles.itemButtonContainer}>
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
                </div>
            );
        }

        if(style === StepperSimpleStyle.BackButton && isActive) {
            return (
                <div className={styles.itemButtonContainer}>
                    <StepperButton
                        key={getGUID()}
                        index={0}
                        selectedIndex={selectedIndex + 1}
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
                </div>
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
        return (
            <div className={styles.barContainer}>
                
                    <div className={styles.circle}>
                        <span className={styles.iconContainer}>
                            {getIcon()}   
                        </span>
                    </div>
                    <div className={styles.textContainer}>
                        {props.item.text}
                
                    </div>
            </div>
        )
    }
    return null;
}