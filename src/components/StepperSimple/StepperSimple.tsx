import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { getGUID } from "@pnp/common";
import { Icon } from '@fluentui/react/lib/Icon';

import styles from './StepperSimple.module.scss';

export enum StepperSimpleDesign {
    Button = "button",
    Bar = "bar"
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
    design?: StepperSimpleDesign;
    disabled?: boolean;
    onChange(value: number): void;
    noBack?: boolean;
}

export function StepperSimple(props: IStepperSimpleProps) {
    const selectedIndex: number = props.selectedIndex || 0;
    const items: IStepperSimpleOption[] = props.items || [];
    const design: StepperSimpleDesign =  props.design || StepperSimpleDesign.Bar;
    const disabled: boolean = props.disabled || false;
    const noBack: boolean = props.noBack || false;

    const isFirst = selectedIndex === 0 ;
    const isLast = items.length === selectedIndex + 1 ;
    // const isPast = () => { return }


    const itemsView: React.ReactNode[] = items.map((item: IStepperSimpleOption, index: number) => {
        const isPast = index < selectedIndex;
        const isActive = index === selectedIndex;
        const isFuther = index > selectedIndex;


        if(design === StepperSimpleDesign.Bar) {
            return (
                <StepperBar
                    key={getGUID()}
                    index={index}
                    selectedIndex={selectedIndex}
                    disabled={disabled}
                    onChange={props.onChange}
                    item={item}
                    isFirst={isFirst}
                    isLast={isLast}
                    isPast={isPast}
                    isActive={isActive}
                    isFuther={isFuther}
                    visible={true}
                />
            );
        }

        if(design === StepperSimpleDesign.Button && isActive) {

            return (
                <div className={styles.itemButtonContainer}>
                    {/* Back */}
                    <StepperButton
                        key={getGUID()}
                        index={index}
                        selectedIndex={selectedIndex - 1}
                        disabled={disabled || isFirst}
                        onChange={props.onChange}
                        item={item}
                        isFirst={isFirst}
                        isLast={isLast}
                        isPast={isPast}
                        isActive={isActive}
                        isFuther={isFuther}
                        visible={!noBack}
                    />
                    {/* Next */}
                    <StepperButton
                        key={getGUID()}
                        index={index}
                        selectedIndex={selectedIndex + 1}
                        disabled={disabled}
                        onChange={props.onChange}
                        item={item}
                        isFirst={isFirst}
                        isLast={isLast}
                        isPast={isPast}
                        isActive={isActive}
                        isFuther={isFuther}
                        visible={true}
                    />
                </div>
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
    if(props.visible) {
        return (
            <div>
                <PrimaryButton text={props.item.text} onClick={() =>props.onChange(props.selectedIndex)} disabled={props.disabled} />
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