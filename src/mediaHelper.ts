export async function fetchShows(): Promise<string[]> {
  try {
    const response = await fetch("http://api.tvmaze.com/shows");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const shows = await response.json();

    const sorted = shows.sort(
      (a: { premiered: string }, b: { premiered: string }) =>
        new Date(b.premiered).getTime() - new Date(a.premiered).getTime()
    );

    const titles: string[] = sorted.map((show: { name: string }) => show.name);

    // titles.forEach((title: string, index: number) => {
    //   console.log(`#${index + 1}: ${title}`);
    // });

    return titles;
  } catch (error) {
    console.error("Error fetching latest show titles:", error);
    return [];
  }
}
