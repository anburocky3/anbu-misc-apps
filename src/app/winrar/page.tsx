"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Download, Copy, Check, RefreshCw } from "lucide-react";
import Image from "next/image";
import WinrarLogo from "../../../public/winrar.jpg";
import { Fira_Code } from "next/font/google";
import { generateLicenseKey } from "@/helpers/wr-algorithm";
import JSZip from "jszip";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

interface License {
  name: string;
  data: string;
}

interface Error {
  name: string;
  type: string;
}

const WinrarLicensePage = () => {
  const [name, setName] = useState("Root");
  const [type, setType] = useState("Single PC usage license");
  const [licenseKey, setLicenseKey] = useState<License | null>();
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Error>();

  const validateForm = () => {
    const newErrors = {} as Error;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "License name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "License Name must be at least 3 characters";
    }

    // Type validation
    if (!type) {
      newErrors.type = "Registration type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (validateForm()) {
      const key = generateLicenseKey(name, type);

      //   console.log("key", key);

      setLicenseKey(key);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(licenseKey!.data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    const blob = new Blob([licenseKey!.data], { type: "text/plain" });

    zip.file("rarreg.key", blob);

    const content = await zip.generateAsync({ type: "blob" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "rarkey.rar";
    link.click();
  };

  const resetLicense = () => {
    setLicenseKey(null);
    setName("");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex items-center justify-center p-6"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-4 mb-6"
        >
          <Image src={WinrarLogo} alt="Winrar Logo" className="w-10 h-10" />
          <div className="text-center">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-center text-gray-800"
            >
              WinRAR License Key Generator
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-2">
              Big thanks to @bitcookies, @teknixstuff
            </motion.p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name:
            </label>
            <motion.input
              variants={itemVariants}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors?.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registration Type:
            </label>
            <motion.select
              variants={itemVariants}
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${
                errors?.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="Single PC usage license">
                Single PC usage license
              </option>
            </motion.select>
            {errors?.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            <Zap className="w-4 inline-flex mr-3" />
            Generate License Key
          </motion.button>

          {licenseKey && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex space-x-3 items-center justify-between">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg font-semibold text-green-700 mb-2"
                >
                  Your License Key:
                </motion.h2>
                <div className="ml-2 space-y-2 space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="p-1 bg-green-100 hover:bg-green-200 rounded"
                    title="Download License Key"
                  >
                    <Download className="text-green-700" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="p-1 bg-green-100 hover:bg-green-200 rounded "
                    title={copied ? "Copied!" : "Copy License Key"}
                  >
                    {copied ? (
                      <Check className="text-green-700" />
                    ) : (
                      <Copy className="text-green-700" />
                    )}
                  </motion.button>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`p-3 rounded text-sm text-green-900 whitespace-pre-wrap ${firaCode.className}`}
              >
                {licenseKey.data}
              </motion.p>

              <motion.small
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-green-600 flex items-center justify-between"
              >
                <div>Buy Winrar License, they deserve it.</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={resetLicense}
                  className="flex items-center hover:text-green-700"
                >
                  <RefreshCw className="w-3 mr-1" />
                  <span>Create Another</span>
                </motion.button>
              </motion.small>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WinrarLicensePage;
