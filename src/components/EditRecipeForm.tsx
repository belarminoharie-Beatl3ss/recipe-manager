
import { useState, useRef } from "react";
import type { SavedRecipe, RecipePatch } from "@/features/recipes/recipes.types";

interface EditRecipeFormProps {
  recipe: SavedRecipe;
  onSave: (patch: RecipePatch) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function EditRecipeForm({
  recipe,
  onSave,
  onCancel,
  isSaving,
}: EditRecipeFormProps) {
  const original = useRef({
    time: recipe.time ?? 0,
    notes: recipe.notes ?? "",
  });

  const [time, setTime] = useState(String(recipe.time ?? 0));
  const [notes, setNotes] = useState(recipe.notes ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTime = Number(time) || 0;
    const updatedNotes = notes.trim();

    if (updatedTime < 0) return;

    const originalTime = original.current.time;
    const originalNotes = original.current.notes;

    // Skip the request if nothing changed.
    if (
      updatedTime === originalTime &&
      updatedNotes === originalNotes
    ) {
      onCancel();
      return;
    }

    // Send only the editable fields.
    onSave({
      id: recipe.id,
      time: updatedTime,
      notes: updatedNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-bold text-lg">{recipe.title}</h3>

      <label className="form-control">
        <span className="label-text">Prep time (minutes)</span>
        <input
          type="number"
          min="0"
          className="input input-bordered"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>

      <label className="form-control">
        <span className="label-text">Notes</span>
        <textarea
          className="textarea textarea-bordered"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <div className="modal-action">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
