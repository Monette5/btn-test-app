import { useState } from 'react';
import { Box, Card, Cell, Collapse, FormField, Input, Layout, Text, TextButton } from '@wix/design-system';
import { ChevronDown, ChevronUp } from '@wix/wix-ui-icons-common';
import { ShippingCosts, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/types/app-data.model';
import testIds from '@/app/utils/test-ids';

interface CustomDropdownProps {
  options: { id: string; value: string; label?: string }[];
  placeholder?: string;
  onSelect: (option: { id: string; value: string }, sameOptionWasPicked: boolean) => void;
}

export function ShippingDeliveryMethodForm({
  title,
  unitOfMeasure,
  shippingCosts,
  onUnitOfMeasureSelected,
  onShippingCostsChanged,
  expandByDefault = false,
}: {
  title: string;
  methodType: ShippingMethodType;
  unitOfMeasure: ShippingUnitOfMeasure;
  shippingCosts: ShippingCosts;
  onUnitOfMeasureSelected: (type: ShippingUnitOfMeasure) => void;
  onShippingCostsChanged: (shippingCosts: ShippingCosts) => void;
  expandByDefault?: boolean;
}) {
  const uomName =
    unitOfMeasure === ShippingUnitOfMeasure.NUM_OF_ITEMS
      ? 'item'
      : unitOfMeasure === ShippingUnitOfMeasure.WEIGHT_IN_LB
        ? 'lb'
        : 'kg';
  const [isOpen, setIsOpen] = useState(expandByDefault);

  const CustomDropdown = (props: CustomDropdownProps) => {
    const [selected, setSelected] = useState('');
  
    const handleSelect = (value: string) => {
      const selectedOption = props.options.find((option) => option.value === value);
      const sameOptionWasPicked = selected === value; // Check if the same option was picked
      setSelected(value);
  
      if (selectedOption) {
        props.onSelect(selectedOption, sameOptionWasPicked); // Pass both arguments
      }
    };
  
    return (
      <div className="dropdown">
        <select onChange={(e) => handleSelect(e.target.value)} value={selected || ''}>
          <option value="" disabled>
            Select an option
          </option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Card dataHook={testIds.DASHBOARD.SHIPPING_METHOD}>
      <Card.Header
        title={title}
        suffix={
          <TextButton dataHook={testIds.DASHBOARD.SHIPPING_METHOD_EXPAND} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </TextButton>
        }
      />
      <Collapse open={isOpen}>
        <Card.Divider />
        <Card.Content dataHook={testIds.DASHBOARD.SHIPPING_METHOD_FORM}>
          <Box direction='vertical' gap='SP7'>
            <FormField label='Parameter'>
              <CustomDropdown
                onSelect={(option, sameOptionWasPicked) => {
                  if (!sameOptionWasPicked) {
                    onUnitOfMeasureSelected(option.id as ShippingUnitOfMeasure);
                  }
                }}
                options={[
                  { id: ShippingUnitOfMeasure.NUM_OF_ITEMS, value: 'Number of items', label: 'Number of items' },
                  { id: ShippingUnitOfMeasure.WEIGHT_IN_KG, value: 'Weight in kg', label: 'Weight in kg' },
                  { id: ShippingUnitOfMeasure.WEIGHT_IN_LB, value: 'Weight in lb', label: 'Weight in lb' },
                ]}
                placeholder='Select parameter'
              />
            </FormField>

            <Box direction='vertical' gap='SP4'>
              <Text>Set conditions:</Text>
              <Layout>
                <Cell span={4}>
                  <FormField label={`First ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      placeholder='Select totalPrice'
                      type='number'
                      value={shippingCosts.first}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, first: Number(e.currentTarget.value) });
                      }}
                    />
                  </FormField>
                </Cell>
                <Cell span={4}>
                  <FormField label={`Second ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      placeholder='Select totalPrice'
                      type='number'
                      value={shippingCosts.second}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, second: Number(e.currentTarget.value) });
                      }}
                    />
                  </FormField>
                </Cell>
                <Cell span={4}>
                  <FormField label={`Each additional ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      suffix={<Input.Affix>per {uomName}</Input.Affix>}
                      value={shippingCosts.thirdAndUp}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, thirdAndUp: Number(e.currentTarget.value) });
                      }}
                      placeholder='Select totalPrice'
                      type='number'
                    />
                  </FormField>
                </Cell>
              </Layout>
            </Box>
          </Box>
        </Card.Content>
      </Collapse>
    </Card>
  );
}
