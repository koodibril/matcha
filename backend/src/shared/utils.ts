export const notFound = (res: any, message: string) => res.status(404).json({ message });
export const unauthorized = (res: any, message: string) => res.status(401).json({ message });
export const badRequest = (res: any, message: string) => res.status(400).json({ message });
export const internalError = (res: any) => (e: any) => {
  console.error(e);
  return res.status(500).json(e);
}