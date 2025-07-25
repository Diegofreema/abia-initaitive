import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedinFilled,
  IconBrandTwitter,
} from '@tabler/icons-react';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AY</span>
              </div>
              <span className="font-bold text-xl">AYLA</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering the next generation of leaders in Abia State through
              comprehensive leadership development programs and mentorship
              opportunities.
            </p>
            <div className="flex space-x-4">
              <Link href={'https://www.facebook.com/learnfactorynigeria'}>
                <IconBrandFacebook className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://x.com/LearnFactoryNG">
                <IconBrandTwitter className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </Link>
              <Link href={'https://www.instagram.com/learnfactorynig'}>
                <IconBrandInstagram className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/company/learnfactory-nigeria/">
                <IconBrandLinkedinFilled className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  About Us
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/programs"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Programs
                </Link>
              </li> */}
              <li>
                <Link
                  href="/user/register"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Register
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">
                  Umuahia, Abia State, Nigeria
                </span>
              </li> */}
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">+234 8108960884</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">+234 8033166567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">
                  info@learnfactory.com.ng
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ABIA Youth Leadership Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
