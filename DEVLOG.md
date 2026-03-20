Read: https://code.visualstudio.com/docs/copilot/customization/prompt-files and
create documention on how to create workspace prompts: 
- only limit explainations to .md files
- create `.AI_docs\prompt-file.md` file
- limit front-matter to `name` and `description`


Read: `https://www.conventionalcommits.org/en/v1.0.0/` and create workspace promptfile /commit (see `.AI_docs\prompt-file.md`) to stage changes and commit, with a conventional commit message, without user confirmation

create workspace prompt file /make-workspace-prompt (see `.AI_docs\prompt-file.md`)
- takes highlevel description as argument
- derives name from description for workspace prompt file
- analyze description to create detailed instructions for ai agent
- include `workflow` section that contains detailed instructions
- include `result` section that describes desired outcome
