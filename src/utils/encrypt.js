import CryptoJS from 'crypto-js';

function rc4Encrypt(key, message) {
    let _key = CryptoJS.enc.Utf8.parse(key);
    let _i = 0, _j = 0;
    let _box = Array.from({ length: 256 }, (_, i) => i);
  
    let x = 0;
    for (let i = 0; i < 256; i++) {
      x = (x + _box[i] + _key.words[i % _key.words.length]) % 256;
      [_box[i], _box[x]] = [_box[x], _box[i]];
    }
  
    let out = [];
    for (let char of message) {
      _i = (_i + 1) % 256;
      _j = (_j + _box[_i]) % 256;
      [_box[_i], _box[_j]] = [_box[_j], _box[_i]];
      let c = char ^ _box[(_box[_i] + _box[_j]) % 256];
      out.push(c);
    }
  
    return out;
  }
  
  // vrfShift Function
  function vrfShift(vrf) {
    let shifts = [-2, -4, -5, 6, 2, -3, 3, 6];
    for (let i = 0; i < vrf.length; i++) {
      let shift = shifts[i % 8];
      vrf[i] = (vrf[i] + shift) & 0xFF;
    }
    return vrf;
  }
  
  // vrfEncrypt Function
  export function vrfEncrypt(input) {
    console.log(input);
    let rc4 = rc4Encrypt('tGn6kIpVXBEUmqjD', Buffer.from(input));
    let vrf = Buffer.from(rc4).toString('base64url');
    let vrf1 = Buffer.from(vrf).toString('base64');
    let vrf2 = vrfShift(Buffer.from(vrf1));
    let vrf3 = Buffer.from(vrf2.reverse()).toString('base64url');
    return Buffer.from(vrf3).toString('utf8');
  }



// vrfDecrypt Function
export function vrfDecrypt(input) {
    let decode = Buffer.from(input, 'base64url');
    let rc4 = rc4Encrypt('LUyDrL4qIxtIxOGs', decode);
    return decodeURIComponent(Buffer.from(rc4).toString('utf8'));
  }



