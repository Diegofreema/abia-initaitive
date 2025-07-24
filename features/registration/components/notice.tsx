import Link from 'next/link';
import React from 'react';

type Props = {
  title?: string;
  subject?: string;
  description?: string;
  link?: string;
  linkText?: string;
};

export const Notice = ({
  title = 'Medical Information',
  description = '⚠️ Ensure that the information provided is correct before proceeding to the next page',
  subject = 'Please provide accurate medical information',
  link,
  linkText = 'Create ABSINN',
}: Props) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-[#060622] mb-2">{title}</h2>
      <p className="text-gray-600">{subject}</p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <p className="text-yellow-800 text-sm font-medium">{description}</p>
        {link && (
          <Link href={link} target="_blank" className="underline font-bold">
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};
