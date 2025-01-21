import * as bcrypt from 'bcrypt';

export async function isPasswordValid(plainPassword: string, hash: string) {
  const isMatch = await bcrypt.compare(plainPassword, hash);

  return isMatch;
}