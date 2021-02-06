export default async function get<T>(url: string): Promise<T> {
  return (await fetch(url)).json();
}
