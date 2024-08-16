# read-package-version

This action simply reads the current `package.json` name and version then emits it to environment variables `$PACKAGE` and `$VER` for use in later actions.

I personally use this to customize the git tags when publishing npm packages.  Often the sequence goes: 1. `npm version *` bumps version, 2. this action reads the new version and sets $env. 3. git tag the repository with name/version combination. This is useful when working in monorepositories that have many individual packages and tags need to be customized for each package.

## Inputs
 - `workspace`: `'.'` local path to `package.json` you want to read. i.e. `./packages/widget`
 - `path`: `$GITHUB_WORKSPACE` (Internal), if you customize the runner filesystem, this lets you change the root repo prefix so the above `workspace` variable will have a path to start. 


## Sets Environment Variables: 
 - `VER`: current version read from `package.json`
 - `PACKAGE`: current name read from `package.json`


## Example usage:

```yaml
 #... typical workflow, action/checkout, etc.
	- name: 'Bump version'
		run: |
			git config user.name github-actions
			git config user.email github-actions@github.com
			npm version patch --no-git-tag-version
	- name: 'Read new package version'
		uses: iwsllc/read-package-version@v1
		with:
			# reads the current name/version from ./packages/test-package/package.json
			workspace: ./packages/test-package
	- name: 'Tag version'
		run: |
			git commit -am "feat: $PACKAGE version bump to $VER"
			git tag -am "Released $PACKAGE $VER" "$PACKAGE@$VER"
			git push
			git push --tags
```