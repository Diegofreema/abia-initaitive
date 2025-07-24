'use client';

import type { UseFormReturn } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { MEDICAL_CONDITIONS, RegistrationFormData } from '../../types';
import { Notice } from '../notice';

interface MedicalStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export function MedicalStep({ form }: MedicalStepProps) {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
  } = form;
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const { hasMedicalCondition, bloodGroup, bloodType } = watch();

  const handleConditionChange = (condition: string, checked: boolean) => {
    let newConditions;
    if (checked) {
      newConditions = [...selectedConditions, condition];
    } else {
      newConditions = selectedConditions.filter((c) => c !== condition);
    }
    setSelectedConditions(newConditions);
    setValue('medicalConditions', newConditions);
  };

  return (
    <div className="space-y-6">
      <Notice />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bloodType" className="text-[#060622] font-medium">
            Blood Type/Genotype *
          </Label>
          <Select
            {...register('bloodType', { required: 'Blood type is required' })}
            required
            value={bloodType}
            onValueChange={(value) => setValue('bloodType', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AA">AA</SelectItem>
              <SelectItem value="AS">AS</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="SS">SS</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="CC">CC</SelectItem>
            </SelectContent>
          </Select>
          {errors.bloodType && !bloodType && (
            <p className="text-red-500 text-sm">{errors.bloodType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup" className="text-[#060622] font-medium">
            Blood Group *
          </Label>
          <Select
            {...register('bloodGroup', { required: 'Blood group is required' })}
            required
            value={bloodGroup}
            onValueChange={(value) => setValue('bloodGroup', value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-[#060622]">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
          {errors.bloodGroup && !bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-[#060622] font-medium">
          Do you have any medical condition/disability? *
        </Label>
        <p className="text-sm text-gray-600">
          (That should be used in assessing workplace adjustments that would be
          required for you)
        </p>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medical-yes"
              checked={hasMedicalCondition === true}
              onCheckedChange={(checked) =>
                setValue('hasMedicalCondition', checked as boolean)
              }
            />
            <Label htmlFor="medical-yes" className="text-sm">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medical-no"
              checked={hasMedicalCondition === false}
              onCheckedChange={(checked) =>
                setValue('hasMedicalCondition', !checked)
              }
            />
            <Label htmlFor="medical-no" className="text-sm">
              No
            </Label>
          </div>
        </div>
      </div>

      {hasMedicalCondition && (
        <div className="space-y-4">
          <Label className="text-[#060622] font-medium">
            Please select medical condition/disability (if any)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MEDICAL_CONDITIONS.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={(checked) =>
                    handleConditionChange(condition, checked as boolean)
                  }
                />
                <Label htmlFor={`condition-${condition}`} className="text-sm">
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
