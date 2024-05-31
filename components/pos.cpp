#include<iostream>
#include<vector>
using namespace std;
int main()
{
	int arr[8]={-3, 1, 2, 4, -6, 8, -8, -1};
	int n=8;
		vector<int> v1;
	    vector<int> v2;
	    vector<int> v3;
	    for(int i=0;i<n;i++)
	    {
	        if(arr[i]>=0)
	        {
	            v1.push_back(arr[i]);
	        }
	        else
	        {
	            v2.push_back(arr[i]);
	        }
	    }
	    int i=0,j=0;
	    while(i<v1.size()&&j<v2.size())
	    {
	        v3.push_back(v1[i]);
	        v3.push_back(v2[j]);
	        i++,j++;
	    }
	    while(i<v1.size())
	    {
	        v3.push_back(v1[i]);
	        i++;
	    }
	    while(j<v2.size())
	    {
	        v3.push_back(v2[j]);
	        j++;
	    }
	    for(i=0;i<v1.size()+v2.size();i++)
	    {
	        arr[i]=v3[i];
	    }
	    for(int i=0;i<n;i++)
	    {
	    	cout<<v3[i]<<" ";
		}
}
