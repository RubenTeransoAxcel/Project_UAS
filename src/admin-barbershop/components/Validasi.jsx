export const validateFAQ = (question, answer) => {
    let errors = {};
    if (!question.trim()) errors.question = "Pertanyaan wajib diisi";
    if (!answer.trim()) errors.answer = "Jawaban wajib diisi";
    if (question.length < 10) errors.question = "Pertanyaan harus memiliki minimal 10 karakter";
    if (answer.length < 15) errors.answer = "Jawaban harus memiliki minimal 15 karakter";
    return errors;
  };