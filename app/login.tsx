import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Check, Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadCredentials = async () => {
      const saved = await AsyncStorage.getItem("saved_credentials");
      if (saved) {
        const { email: savedEmail, password: savedPassword } =
          JSON.parse(saved);
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email or username");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password");
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      if (email.trim() && password.trim()) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        if (rememberMe) {
          await AsyncStorage.setItem(
            "saved_credentials",
            JSON.stringify({ email, password })
          );
        } else {
          await AsyncStorage.removeItem("saved_credentials");
        }
        setIsLoading(false);
        router.replace("/(tabs)" as any);
      } else {
        setIsLoading(false);
        setErrorMessage("Thông tin đăng nhập không hợp lệ.");
      }
    }, 1000);
  };

  return (
    <View className="flex-1 bg-[#101c22] relative overflow-hidden">
      <View className="w-full pt-safe mt-12 mb-4 flex-row items-center justify-center z-10">
        <Text className="text-lg font-bold text-slate-100 text-center">
          Welcome to To Do List
        </Text>
      </View>

      <View className="w-full px-6 flex-col items-center mt-8 flex-1">
        <View className="mb-6 p-4 bg-[#13a4ec]/20 rounded-2xl">
          <Check
            size={40}
            color="#13a4ec"
            strokeWidth={3}
          />
        </View>

        <Text className="text-3xl font-bold mb-2 text-slate-100">Log In</Text>
        <Text className="text-slate-400 mb-8">
          Manage your tasks efficiently
        </Text>

        <View className="w-full gap-5">
          <View className="gap-2">
            <Text className="text-sm font-medium text-slate-300 ml-1">
              Username or Email
            </Text>
            <TextInput
              value={email}
              autoComplete="username"
              textContentType="username"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage("");
              }}
              placeholder="Enter your email"
              placeholderTextColor="#64748b"
              className={`w-full bg-[#1e293b] border ${errorMessage && !email.trim() ? "border-red-500" : "border-slate-700"} rounded-xl px-4 py-3.5 text-slate-100`}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm font-medium text-slate-300 ml-1">
              Password
            </Text>
            <View className="relative justify-center">
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage("");
                }}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                autoComplete="password"
                textContentType="password"
                placeholderTextColor="#64748b"
                className={`w-full bg-[#1e293b] border ${errorMessage && !password.trim() ? "border-red-500" : "border-slate-700"} rounded-xl px-4 py-3.5 text-slate-100 pr-12`}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4">
                {showPassword ? (
                  <EyeOff
                    size={20}
                    color="#64748b"
                  />
                ) : (
                  <Eye
                    size={20}
                    color="#64748b"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? (
            <Text className="text-red-500 text-sm ml-1 font-medium">
              {errorMessage}
            </Text>
          ) : null}

          <View className="flex-row items-center space-x-3 mt-2">
            <TouchableOpacity
              className={`w-5 h-5 rounded border items-center justify-center ${rememberMe ? "bg-[#13a4ec] border-[#13a4ec]" : "border-slate-600 bg-[#1e293b]"}`}
              onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && (
                <Check
                  size={14}
                  color="white"
                />
              )}
            </TouchableOpacity>
            <Text
              className="text-sm text-slate-300 ml-2"
              onPress={() => setRememberMe(!rememberMe)}>
              Remember Password
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`w-full items-center justify-center py-4 rounded-xl mt-4 ${isLoading ? "bg-[#13a4ec]/70" : "bg-[#13a4ec]"}`}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">Log In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
