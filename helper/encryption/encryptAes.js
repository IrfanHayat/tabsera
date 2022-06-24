import crypto from "crypto";

export default function encryption(data) {
    try {
        var key = "0123456789abcdef";

        var iv = "fedcba9876543210";
        
       let cipher=  crypto.createCipheriv("aes-128-cbc", key, iv);

       const encrypted = cipher.update(JSON.stringify(data), "utf8", "base64") + cipher.final("base64");

        return encrypted;
    } catch (exp) {
        
        return;
    }
}
