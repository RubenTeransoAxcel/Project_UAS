import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Kirim data ke parent component
  };
  
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Cari sesuatu..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <Button onClick={handleSearch} variant="ghost">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
