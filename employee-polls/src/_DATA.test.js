import { _saveQuestion, _saveQuestionAnswer } from './_DATA';

describe('saveQuestion', () => {
  it('will return true if the input data was correct', async () => {
    const question = {
      optionOneText: 'Option numero uno',
      optionTwoText: 'Second option',
      author: 'sarahedo'
    };
    const result = await _saveQuestion(question);
    expect(result.resolve).not.toEqual('error');
  });

  it('will return an error if the questions cannot be added', async () => {
    const invalidQuestion = 'tree';
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('saveQuestionAnswer', () => {
  it('will return true if the poll answer successfully posted', async () => {
    const submission = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };
    const result = await _saveQuestionAnswer(submission);
    expect(result).toEqual(true);
  });

  it('will return an error if the poll answer cannot be saved to the database', async () => {
    const invalidQuestion = 'tree';
    await expect(_saveQuestionAnswer(invalidQuestion)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
