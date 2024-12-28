import React from 'react'
import { 
  TruckIcon, 
  CheckCircleIcon, 
  CreditCardIcon 
} from 'lucide-react';

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
      {
        label: 'Shipping Details',
        icon: TruckIcon
      },
      {
        label: 'Confirm Order',
        icon: CheckCircleIcon
      },
      {
        label: 'Payment',
        icon: CreditCardIcon
      }
    ];
  
    return (
      <div className="w-full py-6">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center ${
                activeStep >= index ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-current">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="ml-2 text-sm font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-2 ${
                  activeStep > index ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default CheckOutSteps