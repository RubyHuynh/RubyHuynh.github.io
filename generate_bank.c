// basic file operations
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int main () {
    FILE * fp, *fw;
    char * line = NULL;
    size_t len = 0;
    ssize_t read;
    bool aFlag, qFlag;
    char* prev = "#";
    int idx = 0;
    fp = fopen("example.txt", "r");
    fw = fopen("ret.xml", "w+");
    fprintf(fw, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    fprintf(fw, "<bank>\n");
    if (fp == NULL)
        exit(EXIT_FAILURE);
    while ((read = getline(&line, &len, fp)) != -1) {
        while (line[strlen(line)-1] == '\n' || line[strlen(line)-1] == '\r') {
            line[strlen(line)-1] = '\0';
        }
        printf("(%s)\n", line);
        if (strstr(line, "@@")) {
            fprintf(fw, "\t<quiz>\n\t\t<answers>\n");
            aFlag = true;
            idx = -1;
            goto _done;
        }
        if (strstr(line, "#@")) {
            fprintf(fw, "\n\t\t</answers>\n");
            aFlag = false;
            goto _done;
        }
        if (strstr(line, "&&")) {
            fprintf(fw, "\n\t\t<questions>\n");
            qFlag = true;
            goto _done;
        }
        if (strstr(line, "#&")) {
            fprintf(fw, "\n\t\t</questions>\n\t</quiz>\n");
            qFlag = false;
            goto _done;
        }
        if (aFlag) {
            fprintf(fw, "\n\t\t\t\t<a id='%d'>%s</a>\n", idx, line);
        }
        else {
            char* token = strchr(line, ' ');
            char* index = strdup(line);
            index[token - line] = '\0';
            
            printf("AAAAAAAAAAAAA (%s)\n", index);
            fprintf(fw, "\n\t\t\t\t<q id='%d'>%s</q>\n", atoi(index), &line[3]);
            free(index);
        }
_done:
        idx++;
    }
    fprintf(fw, "</bank>\n");
    fclose(fp);
    if (line)
        free(line);
    return 0;
}
