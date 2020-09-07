def lcs(X, Y):
	#find the length of both variable 
	m = len(X)
	n = len(Y)

	#declaring the array of stroing the dp values 
	L = [[None]* (n + 1) for i in range( m + 1)]

	for i in range(m+1):
		for j in range(n + 1):
			if i == 0 or j == 0:
				L[i][j] = 0
			elif(X[i - 1] == Y[j-1]):
				L[i][j] = L[i-1][j-1]+1
			else:
				L[i][j]= max(L[i-1][j], L[i][j-1])

		# L[m][n] contains the length of LCS of X[0...n-1] & Y[0..m-1]
	return L[m][n]



# Driver program to test the above function 
X = "AGGTAB"
Y = "GXTXAYB"
print(lcs(X, Y))